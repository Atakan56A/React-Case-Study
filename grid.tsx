import * as React from 'react';
import './grid.css'; 

interface Person {
  name: string;
  mailReceivedDate: string;
  solutionSentDate?: string;
  isBackgroundColorRed?: boolean;
}

interface GridProps {
  source: Person[];
}

const Grid: React.FC<GridProps> = ({ source }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="grid-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>İsim</th>
            <th>Mail Alınma Tarihi</th>
            <th>Çözüm Gönderilme Tarihi</th>
          </tr>
        </thead>
        <tbody>
          {source.map((person, index) => (
            <tr
              key={index}
              className={person.isBackgroundColorRed ? 'red-background' : ''}
            >
              <td>{person.name}</td>
              <td>{formatDate(person.mailReceivedDate)}</td>
              <td>
                {person.solutionSentDate
                  ? formatDate(person.solutionSentDate)
                  : 'Henüz Gönderilmedi'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
