# DataVizChallange

This project is an application skeleton for a typical [AngularJS](http://angularjs.org/) + [Django](https://www.djangoproject.com/) web app.
It's used for a simple challange on visualization of Big Data coming from an unknown source.

## Architecture
It's splitted into Front End and Back End folders.
Front End is AngularJS + HTML5 + Angular Material
Back End is Python3, Django and Pandas

## Prerequisites

You simply need  [Python3](https://www.python.org/downloads/) and [VirtualEnvWrapper](https://virtualenvwrapper.readthedocs.io/)

## Getting Started

Clone this repository on your computer and follow the Installation instructions

## Installation

Back End:
+	Browse to ```back-end``` folder
+	Create and activate a new virtualenv with ```mkvirtualenv MyNewVirtualEnv```
+	Install Python dependencies ```pip3 install -r requirements.txt``` or ```pip install -r requirements.txt`` if only Python3 is installed

Front End:
+	Browse to ```front-end``` folder
+	Write in the shell ```npm install```

## Run the Application

Back End:
+	Browse to ```back-end``` folder
+	```python3 manage.py runserver``` or ```python manage.py runserver``` if only Python3 is installed

Front End:
+	Browse to ```front-end``` folder
+	Write in the shell ```npm start```
+	Now browse the app at `http://localhost:3000`

Enjoy!