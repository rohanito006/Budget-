## ⚙️ Installation et Configuration
python -m venv env
# Windows
source env/Scripts/activate
# Linux/Mac
source env/bin/activate

python -m pip install djangorestframework django-cors-headers
python -m django startproject backend .
django-admin startapp api

declare app qu'on vient d'installer dans setting (installed_apps)
