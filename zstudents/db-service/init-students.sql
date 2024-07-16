use webdb;

create table if not exists students (id int primary key, firstname varchar(255), lastname varchar(255));

delete from students where id>0;

insert into students (id,firstname,lastname) values (1, 'med', 'zit');
insert into students (id,firstname,lastname) values (2, 'alex', 'dubois');
insert into students (id,firstname,lastname) values (3, 'aymen', 'kasraoui');

commit;

select * from students;