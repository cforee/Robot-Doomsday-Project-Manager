server:
	rails s thin -p 3000
dbstart:
	pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log restart
