# EventHub

Aplikacja napisana w technologii React, umożliwiająca planowanie wydarzeń oraz zarządzanie nimi

# Uruchamianie 

Terminal (główny folder projektu):

1. npm start
2. json-server --watch src/app/db/db.json

<!-- 
Punktacja elementów technicznych (15pkt):
/ własna walidacja danych wprowadzanych przez użytkownika ( w każdym przypadku wprowadzania danych, co najmniej 5 różnych przypadków danych) - 2pkt, 
+ użycie TypeScript, ew. obowiązkowa weryfikacja typu danych (PropTypes) przekazywanych do wszystkich komponentów (nie stosujemy typu 'any') - 2pkt
+ wykorzystanie komponentów prezentacyjnych (co najmniej 2 przypadki) - 1pkt,
+ dwukierunkowa komunikacja pomiędzy komponentami - 1pkt,
/ co najmniej 4 komponenty reużywalne (komponenty, które mogą być użyte bez zmian w kodzie komponentu w innym miejscu projektu) - 2pkt
? modyfikacja danych odbywa się tylko w jednym komponencie - 1pkt
+ operacje modyfikacji danych za pomocą 4 rodzajów żądań http - 2pkt
+ żądania do serwera są zapisane w jednym oddzielnym pliku (serwis) - 1pkt
+ routing (ścieżki 'routes', w tym jedna z parametrem) - 1pkt
+ wykorzystanie dwóch zmiennych właściwości routingu (np. navigate, params) - 1pkt
+ brak błędów/ostrzeżeń w konsoli przegladarki - 1pkt

walidacja daty przy dodawaniu/edycji wydarzenia nie działa
walidacja godzin przy dodawaniu/edycji planu nie działa poprawnie
wymyśleć gdzie zrobić 3 komponenty reużywalne (takie które mają logikę i są uzytwe więcej niż jeden raz w kodzie; nie mylić z: komponenty prezentacyjne - to take, kótre nie mają ŻADNEJ logiki)
ogarnąć o co chodzi z modyfikacją danych w jednym komponencie (czy jest w projekcie czy nie)

przejrzeć jeszcze raz wszystkie wymagania i czy jest zaimplementowane wszystko
 -->
