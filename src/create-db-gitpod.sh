
psql -U postgres -c "CREATE DATABASE mydatabase ENCODING 'utf8';"

psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;"