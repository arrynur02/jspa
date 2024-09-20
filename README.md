# JSPA - JavaScript Page Application Router

JSPA (jQuery Page Application Router) adalah sebuah script JavaScript yang digunakan untuk mengatur navigasi halaman dalam aplikasi berbasis JavaScript menggunakan berbagai mode router seperti hash, slash, dan search.

## Note 
plugin ini perlu dengan jQuery (https://jquery.com/)

## Fitur Utama

- **Dynamic Routing**: Mengelola navigasi dengan menggunakan hash (`#/`), slash (`/`), dan search (`?`) sebagai mode rute.
- **Menu Navigation**: Menyediakan navigasi yang dinamis dengan menyoroti menu aktif berdasarkan rute yang sedang diakses.
- **Preload**: Mendukung tampilan preloader sebelum konten halaman dimuat.
- **Event-driven Routing**: Sistem routing berdasarkan event untuk memuat dan menavigasi halaman dengan mudah.
- **AJAX Content Loading**: Mengambil konten halaman secara dinamis melalui AJAX.

## Struktur Objek

### `jspa.option_`
Ini adalah pengaturan utama yang dapat diubah sesuai kebutuhan aplikasi.

- **app**: Elemen DOM tempat konten akan dimuat.
- **baseUrl**: URL dasar aplikasi.
- **basePath**: Menentukan apakah jalur dasar akan digunakan.
- **routerwithbaseurl**: Menentukan apakah router menggunakan base URL.
- **preload**: Menentukan apakah preloader akan digunakan.
- **preloadDelayTimes**: Mengatur waktu tunda untuk preloader.
- **hashReplace**: Mengelola penggantian hash pada rute.
- **routerMode**: Mode router yang digunakan (`hash`, `slash`, atau `search`).
- **menuNavigation**: Konfigurasi untuk navigasi menu.
  - **init_menuNav**: Elemen menu yang akan diinisialisasi.
  - **ClassNavActive**: Kelas CSS untuk menu aktif.
  - **ClassNav_Li_Active**: Kelas CSS untuk `<li>` aktif.
  - **ClassNav_Li_A_Active**: Kelas CSS untuk `<a>` aktif.

### `jspa.event_option_`
Opsi untuk event routing.

- **path**: URL jalur yang dimuat.
- **router**: Rute yang digunakan.
- **title**: Judul halaman.

## Fungsi Utama

### `init(option_)`
Inisialisasi JSPA dengan opsi yang ditentukan. Jika aplikasi atau URL dasar tidak diatur, pesan kesalahan akan ditampilkan.

### `RouterMode(route)`
Mengembalikan mode rute (`hash`, `slash`, atau `search`) sesuai dengan rute yang diberikan.

### `MenuAttribute(route)`
Mengelola atribut menu berdasarkan rute yang sedang diakses dan menyoroti menu yang sesuai.

### `NavigationMenuActive(route)`
Mengatur menu navigasi agar aktif sesuai dengan rute yang sedang diakses.

### `event_(event_option_)`
Menangani event routing, memuat konten menggunakan AJAX dan memperbarui URL.

### `router(routes)`
Mengelola perubahan URL menggunakan `pushState` atau `replaceState`.

### `MenuEventActive(initEvent)`
Mengikat event klik pada elemen menu untuk menangani navigasi halaman.

### `MenuEvent(event)`
Memanggil event routing secara manual dengan atribut yang diberikan.

## Cara Menggunakan

1. **Inisialisasi JSPA**
   Pastikan untuk menginisialisasi JSPA dengan pengaturan yang sesuai pada awal aplikasi.

   ```javascript
   jspa.init({
     app: '#app-container',
     baseUrl: '/myapp',
     routerMode: 'hash',
     menuNavigation: {
       init_menuNav: '.menu-item',
       ClassNavActive: 'active',
       ClassNav_Li_Active: 'li-active',
       ClassNav_Li_A_Active: 'a-active',
     }
   });

