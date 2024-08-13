# Evenly Split

Annabel Edwards, Macy Bosnich, Emily Wei, Ebube Okonji

## Design Doc link:

https://docs.google.com/document/d/1mfYuqoxYQvggirwdW_P-PXNbxPQdmBllaW1DdrNIPGo/edit#heading=h.s3ulgzgzkjx8

anyone with link should have viewing access

# Setup

## Backend:

pip install -r requirements.txt

### poetry

install poetry
poetry run ./manage.py makemigrations
poetry run ./manage.py migrate
poetry run ./manage.py runserver

### python

python run ./manage.py makemigrations
python run ./manage.py migrate
python run ./manage.py runserver

## Frontend:

npm i
npm run build
npm run start
# evenlySplit
