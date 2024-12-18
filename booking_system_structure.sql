CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username varchar(255) UNIQUE,
    birth_date DATE
);

CREATE TABLE passwords(
    user_id integer UNIQUE REFERENCES users(id),
    password_hash varchar(255),
    salt varchar(255),
    PRIMARY KEY (user_id)
);

CREATE TABLE defined_roles(
    role_id SERIAL PRIMARY KEY,
    role_name varchar(255) UNIQUE
);

CREATE TABLE roles_of_users(
    user_id integer REFERENCES users(id),
    role_id integer REFERENCES defined_roles(role_id),
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE login_history(
    id SERIAL PRIMARY KEY,
    data varchar(255),
    iv varchar(255)
);

CREATE TABLE logviewing_history(
    id SERIAL PRIMARY KEY,
    data varchar(255),
    iv varchar(255)
);

CREATE TABLE resources(
    id SERIAL PRIMARY KEY,
    name varchar(255) UNIQUE,
    description varchar(255)
);

CREATE TABLE reserved_resources(
    reserver_user_id integer REFERENCES users(id),
    resource_id integer REFERENCES resources(id)
);

INSERT INTO defined_roles (role_name)
VALUES

('admin'),
('reserver');