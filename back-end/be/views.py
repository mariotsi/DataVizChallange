import pandas as pd

from django.http import HttpResponse
from django.http import JsonResponse
from rest_pandas import PandasSimpleView

from be.settings import *


def getParams(url):
    params = url.split("?")[1]
    params = params.split('=')
    pairs = zip(params[0::2], params[1::2])
    return dict((k, v) for k, v in pairs)

class UtilsView(PandasSimpleView):

    def get_car_nameplates(request, *args, **kargs):
        data = pd.read_pickle(os.path.join(BASE_DIR, 'data/secret_data.pkl'))
        if 'brand' in kargs:
            data = data[data['brand'] == kargs['brand']]
        return JsonResponse({'nameplates':data['nameplate'].unique().tolist()})


    def get_countries(request, *args):
        data = pd.read_pickle(os.path.join(BASE_DIR, 'data/secret_data.pkl'))
        return JsonResponse(data['country'].unique().tolist(), safe=False)

    def get_tyres(request, *args, **kargs):
        print(kargs)
        data = pd.read_pickle(os.path.join(BASE_DIR, 'data/secret_data.pkl'))['tyre_size'].unique()

        #data = data[data['tyre_size'] == 'A']
        #data = [size for size in data if 'NOT ASSIGNED' not in size]
        # data['tyre_size'].unique().tolist()
        return JsonResponse([size for size in data if 'NOT ASSIGNED' not in size], safe=False)


    def get_car_brands(request, *args):
        data = pd.read_pickle(os.path.join(BASE_DIR, 'data/secret_data.pkl'))['brand'].unique()
        return JsonResponse(data.tolist(), safe=False)

    def a(equest, *args):
        data = pd.read_pickle(os.path.join(BASE_DIR, 'data/secret_data.pkl'))
        return JsonResponse(data[:1], safe=False)


class CountriesView(PandasSimpleView):
    def get_overview(request, *args):
        format_for_fighchart = request.GET.get('forHighcharts', None) is not None

        result = {'chart': [], 'table': []} if format_for_fighchart else {}
        df = pd.read_pickle(os.path.join(BASE_DIR, 'data/secret_data.pkl'))

        countries = df['country'].unique().tolist()
        years = df['year'].unique().tolist()

        grouped_data = df.groupby(['country', 'year'])['potential_tyres_rep']

        for country in countries:
            if format_for_fighchart:
                result['chart'].append({
                    'name': country,
                    'data': [[int(year), grouped_data.get_group((country, year)).sum()] for year in sorted(years)]
                })
                result['table'].append({year: grouped_data.get_group((country, year)).sum() for year in years})
                result['table'][-1]['country'] = country
            else:
                result[country] = [{year: grouped_data.get_group((country, year)).sum()} for year in years]
        return JsonResponse(result)

    def get_overview_per_country(request, *args, **kargs):
        if 'countrySelected' not in kargs or request.GET.get('type', None) is None:
            return HttpResponse(status=502)

        df = pd.read_pickle(os.path.join(BASE_DIR, 'data/secret_data.pkl'))
        df = df[df['country'] == kargs['countrySelected']]

        result = {'chart': [], 'table': []}
        if request.GET.get('type', None).lower() == 'tyre':
            grouped_data = df.groupby(['tyre_size', 'year'])['potential_tyres_rep']
            tyres = df['tyre_size'].unique().tolist()
            years = df['year'].unique().tolist()
            tyres_gen = (tyre for tyre in tyres if 'NOT ASSIGNED' not in tyre)
            for tyre in tyres_gen:
                result['chart'].append({
                    'name': tyre,
                    'data': [[int(year), grouped_data.get_group((tyre, year)).sum()] if (tyre,year) in grouped_data.groups.keys() else [int(year), 0] for year in sorted(years)]
                })
                result['table'].append({year: grouped_data.get_group((tyre, year)).sum() if (tyre,year) in grouped_data.groups.keys() else 0 for year in years})
                result['table'][-1]['tyre'] = tyre
        else:
            grouped_data = df.groupby(['brand', 'nameplate', 'program', 'year'])['potential_tyres_rep']
            brands = df['brand'].unique().tolist()
            nameplates = df['nameplate'].unique().tolist()
            programs = df['program'].unique().tolist()
            years = df['year'].unique().tolist()
            for brand in brands:
                for nameplate in nameplates:
                    for program in programs:
                        if len(df[(df['brand'] == brand) & (df['nameplate'] == nameplate) & (df['program'] == program)]) > 0:
                            result['chart'].append({
                                'name': brand + ' ' + nameplate + ' ' + program,
                                'data': [[int(year), grouped_data.get_group((brand, nameplate, program, year)).sum()] if (brand, nameplate, program, year) in grouped_data.groups.keys() else [
                                    int(year), 0] for year in sorted(years)]
                            })
                            result['table'].append({year: grouped_data.get_group((brand, nameplate, program, year)).sum() if (brand, nameplate, program, year) in grouped_data.groups.keys() else 0
                                                    for year in years})
                            result['table'][-1]['car'] = brand + ' ' + nameplate + ' ' + program

        return JsonResponse(result)




