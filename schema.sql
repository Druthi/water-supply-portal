drop database if exists water_supply;
create database water_supply;
\connect water_supply;

CREATE TABLE  connections(
    id SERIAL primary key,
    sl_no integer NOT NULL,
    street_name varchar,
    door_no varchar,
    water_quality varchar,
    pressure varchar,
    timing varchar,
    drainage_issue varchar,
    other varchar
);

\COPY connections(sl_no, street_name,door_no,water_quality,pressure,timing,drainage_issue,other) FROM '/Users/druthipolisetty/Documents/Projects/water-supply-portal/Shanthinagar.csv' DELIMITER ',' CSV HEADER;