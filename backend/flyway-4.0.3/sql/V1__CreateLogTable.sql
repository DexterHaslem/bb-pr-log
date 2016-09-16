# see https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-entity_pullrequest

/* i was going to flesh out entities, screw that, just need simple log
hang on to all the json and send to client, that will do


create table state (
  id int not null PRIMARY KEY,
  description varchar(32) not null
);
/*
MERGED
SUPERSEDED
OPEN
DECLINED

create table comment(
  id int not null primary key,
  content varchar(2048) not null,
  created_on timestamp not null,
  updated_on timestamp not null
);

create table actor(
  -- guid is sent in a weird string format, just pk off an id we'll create
  id int not null primary key,
  display_name varchar(256) not null,
  username varchar(64) not null,
  type varchar(32) not null,
  uuid varchar(64) not null
);

create table repository(
  -- guid is sent in a weird string format, just pk off an id we'll create
  id int not null primary key,
  name varchar(128) not null,
  uuid varchar(64) not null,
  full_name varchar(256) not null,
  scm varchar(16) not null,
  type varchar(32) not null,
  website varchar(256) not null,
  is_private varchar(32) not null,
  owner_id int REFERENCES actor(id)
);

create table pullrequest(
  id int not null PRIMARY KEY,
  title varchar(256) not null,
  description varchar(256) not null,
  state int not null REFERENCES state(id),
  updated_on timestamp not null,
  updated_on timestamp not null,
  task_count int not null,
  comment_count int not null,
  reason varchar(1024) not null,
  -- this is full user actor, but just keep track of username
  closed_by varchar(256) not null,
);*/

create table log(
  id int AUTO_INCREMENT not null PRIMARY KEY,
  type varchar(32) not null,
  time timestamp not null,
  payload text not null
);