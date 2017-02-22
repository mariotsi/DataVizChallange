"""be URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers

from .views import *

# router = routers.DefaultRouter()
# router.register(r'utils', UtilsView)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    #url(r'^', router.urls),
    #url(r'utils/', UtilsView.as_view()),
    url(r'api/utils/getCountries', UtilsView.get_countries),
    url(r'api/utils/getTyres', UtilsView.get_tyres),
    url(r'api/utils/getCarBrands', UtilsView.get_car_brands),
    url(r'api/utils/getCarNameplate', UtilsView.get_car_nameplates),
    url(r'api/utils/(?P<brand>.+)/getCarNameplate', UtilsView.get_car_nameplates),
    url(r'api/countries/getOverview', CountriesView.get_overview),
    url(r'api/countries/(?P<countrySelected>.+)/getOverview', CountriesView.get_overview_per_country),
]
