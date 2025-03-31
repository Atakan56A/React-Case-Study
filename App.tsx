import * as React from 'react';
import './style.css';
import Grid from './grid';
import dataList from './data.json';

function control(today: Date, limit: number): number {
  const tableRows = document.querySelectorAll('.data-table tbody tr');
  let wrongColorCount = 0;

  tableRows.forEach((row) => {
    const cells = row.querySelectorAll('td');

    if (cells.length >= 3) {
      const mailReceivedDateText = cells[1].textContent || '';
      const solutionSentDateText = cells[2].textContent || '';

      try {
        const mailReceivedDate = parseDate(mailReceivedDateText);
        const solutionSentDate =
          solutionSentDateText === 'Henüz Gönderilmedi'
            ? today
            : parseDate(solutionSentDateText);

        const dayDifference = calculateDayDifference(
          mailReceivedDate,
          solutionSentDate
        );

        const shouldBeRed = dayDifference > limit;
        const isRed = row.classList.contains('red-background');

        if (shouldBeRed !== isRed) {
          wrongColorCount++;
        }
      } catch (error) {
        console.error('Error processing row:', error);
      }
    }
  });

  return wrongColorCount;
}

function parseDate(dateString: string): Date {
  const monthNames: { [key: string]: number } = {
    Ocak: 0,
    Şubat: 1,
    Mart: 2,
    Nisan: 3,
    Mayıs: 4,
    Haziran: 5,
    Temmuz: 6,
    Ağustos: 7,
    Eylül: 8,
    Ekim: 9,
    Kasım: 10,
    Aralık: 11,
  };

  const parts = dateString.trim().split(' ');
  if (parts.length !== 3) {
    throw new Error(`Invalid date format: ${dateString}`);
  }

  const day = parseInt(parts[0], 10);
  const month = monthNames[parts[1]];
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || month === undefined || isNaN(year)) {
    throw new Error(`Could not parse date: ${dateString}`);
  }

  return new Date(year, month, day);
}

function calculateDayDifference(startDate: Date, endDate: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / oneDay);
}

export default function App() {
  let sourceProp = dataList;

  const checkTableColors = () => {
    const today = new Date();
    const limit = 7;
    const wrongColors = control(today, limit);
    alert(`Yanlış renkli satır sayısı: ${wrongColors}`);
  };

  return (
    <div>
      <h1>Dgpays Case Study </h1>
      <Grid source={sourceProp} />
      <button
        onClick={checkTableColors}
        style={{ marginTop: '20px', padding: '10px' }}
      >
        Tabloyu Kontrol Et
      </button>
    </div>
  );
}
