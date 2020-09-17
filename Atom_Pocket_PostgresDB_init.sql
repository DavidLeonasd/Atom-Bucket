CREATE DATABASE atom_pocket;
\c atom_pocket;

CREATE TABLE dompet(
	id SERIAL,
	nama varchar NOT NULL,
	referensi varchar,
	deskripsi varchar,
	isActive boolean NOT NULL DEFAULT TRUE,
	
	PRIMARY KEY (id)
);

CREATE TABLE kategori(
	id SERIAL,
	nama varchar NOT NULL,
	deskripsi varchar,
	isActive boolean NOT NULL DEFAULT TRUE,

	PRIMARY KEY (id)
);

CREATE TABLE transaksi(
	id SERIAL,
	kode varchar NOT NULL,
	deskripsi varchar,
	tanggal DATE,
	nilai decimal,
	dompet_id INT,
	kategori_id INT,
	isTransaksiMasuk boolean NOT NULL,

	PRIMARY KEY (id),
	CONSTRAINT fk_dompet
      FOREIGN KEY(dompet_id) 
	  REFERENCES dompet(id),
	CONSTRAINT fk_kategori
      FOREIGN KEY(kategori_id) 
	  REFERENCES kategori(id)
	
	
);
