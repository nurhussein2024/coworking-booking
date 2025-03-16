# Bokningsplattform för Coworking Space

Detta projekt är en backend-lösning för en bokningsplattform för ett coworking-space. Användare kan registrera sig, logga in, boka arbetsplatser eller konferensrum. Administratörer kan hantera användare, rum och bokningar.

## Funktioner

- **Användarroller**: Vanliga användare kan registrera sig, logga in och hantera sina bokningar. Administratörer kan hantera rum och användare.
- **Bokning**: Användare kan boka rum genom att ange rum-ID, datum och tid. Systemet kollar om rummet är ledigt innan bokningen sparas.
- **Notifikationer**: Realtidsnotifikationer skickas till användare när en bokning skapas eller ändras.
- **Autentisering och Auktorisering**: JWT används för att autentisera användare och skydda rutter.

## Installation

För att köra detta projekt lokalt behöver du följande:

1. Klona repositoryt:
   ```bash
   git clone https://github.com/nurhussein2024/coworking-booking.git


   npm install

