import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class LineupComponent implements OnInit {
  @Input() formation: string = '4-4-2'; // Proporcionar un valor predeterminado
  @Input() lineup: any; // Los datos de la alineación desde la API

  fieldImage: string = 'assets/images/field.png'; // Ruta a la imagen del campo
  backupFieldImage: string = 'assets/images/backup-field.png'; // Ruta a una imagen de respaldo del campo


  positions: { [key: string]: { home: { top: string, left: string }[], away: { top: string, left: string }[] } } = {
    '4-4-2': {
      home: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '20%' }, // Defensor
        { top: '35%', left: '40%' },
        { top: '35%', left: '60%' },
        { top: '35%', left: '80%' },
        { top: '55%', left: '20%' }, // Centrocampista
        { top: '55%', left: '40%' },
        { top: '55%', left: '60%' },
        { top: '55%', left: '80%' },
        { top: '75%', left: '35%' }, // Delantero
        { top: '75%', left: '65%' }
      ],
      away: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '20%' }, // Defensor
        { top: '35%', left: '40%' },
        { top: '35%', left: '60%' },
        { top: '35%', left: '80%' },
        { top: '55%', left: '20%' }, // Centrocampista
        { top: '55%', left: '40%' },
        { top: '55%', left: '60%' },
        { top: '55%', left: '80%' },
        { top: '75%', left: '35%' }, // Delantero
        { top: '75%', left: '65%' }
      ]
    },
    '4-2-3-1': {
      home: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '20%' }, // Defensor
        { top: '35%', left: '40%' },
        { top: '35%', left: '60%' },
        { top: '35%', left: '80%' },
        { top: '55%', left: '35%' }, // Centrocampista defensivo
        { top: '55%', left: '65%' },
        { top: '65%', left: '20%' }, // Centrocampista ofensivo
        { top: '65%', left: '50%' },
        { top: '65%', left: '80%' },
        { top: '85%', left: '50%' }  // Delantero
      ],
      away: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '20%' }, // Defensor
        { top: '35%', left: '40%' },
        { top: '35%', left: '60%' },
        { top: '35%', left: '80%' },
        { top: '55%', left: '35%' }, // Centrocampista defensivo
        { top: '55%', left: '65%' },
        { top: '65%', left: '20%' }, // Centrocampista ofensivo
        { top: '65%', left: '50%' },
        { top: '65%', left: '80%' },
        { top: '85%', left: '50%' }  // Delantero
      ]
    },
    '3-4-2-1': {
      home: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '30%' }, // Defensor
        { top: '35%', left: '50%' },
        { top: '35%', left: '70%' },
        { top: '55%', left: '25%' }, // Centrocampista
        { top: '55%', left: '45%' },
        { top: '55%', left: '55%' },
        { top: '55%', left: '75%' },
        { top: '75%', left: '40%' }, // Centrocampista ofensivo
        { top: '75%', left: '60%' },
        { top: '85%', left: '50%' }  // Delantero
      ],
      away: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '30%' }, // Defensor
        { top: '35%', left: '50%' },
        { top: '35%', left: '70%' },
        { top: '55%', left: '25%' }, // Centrocampista
        { top: '55%', left: '45%' },
        { top: '55%', left: '55%' },
        { top: '55%', left: '75%' },
        { top: '75%', left: '40%' }, // Centrocampista ofensivo
        { top: '75%', left: '60%' },
        { top: '85%', left: '50%' }  // Delantero
      ]
    },
    '4-3-3': {
      home: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '15%' }, // Defensor
        { top: '35%', left: '35%' },
        { top: '35%', left: '65%' },
        { top: '35%', left: '85%' },
        { top: '55%', left: '25%' }, // Centrocampista
        { top: '55%', left: '50%' },
        { top: '55%', left: '75%' },
        { top: '75%', left: '15%' }, // Delantero
        { top: '75%', left: '50%' },
        { top: '75%', left: '85%' }
      ],
      away: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '15%' }, // Defensor
        { top: '35%', left: '35%' },
        { top: '35%', left: '65%' },
        { top: '35%', left: '85%' },
        { top: '55%', left: '25%' }, // Centrocampista
        { top: '55%', left: '50%' },
        { top: '55%', left: '75%' },
        { top: '75%', left: '15%' }, // Delantero
        { top: '75%', left: '50%' },
        { top: '75%', left: '85%' }
      ]
    },
    '5-3-2': {
      home: [
        { top: '15%', left: '50%' },  // Portero
        { top: '30%', left: '15%' }, // Defensor
        { top: '30%', left: '35%' },
        { top: '30%', left: '50%' },
        { top: '30%', left: '65%' },
        { top: '30%', left: '85%' },
        { top: '55%', left: '30%' }, // Centrocampista
        { top: '55%', left: '50%' },
        { top: '55%', left: '70%' },
        { top: '75%', left: '45%' }, // Delantero
        { top: '75%', left: '55%' }
      ],
      away: [
        { top: '15%', left: '50%' },  // Portero
        { top: '30%', left: '15%' }, // Defensor
        { top: '30%', left: '35%' },
        { top: '30%', left: '50%' },
        { top: '30%', left: '65%' },
        { top: '30%', left: '85%' },
        { top: '55%', left: '30%' }, // Centrocampista
        { top: '55%', left: '50%' },
        { top: '55%', left: '70%' },
        { top: '75%', left: '45%' }, // Delantero
        { top: '75%', left: '55%' }
      ]
    },
    // Nuevas formaciones
    '3-5-2': {
      home: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '25%' }, // Defensor
        { top: '35%', left: '50%' },
        { top: '35%', left: '75%' },
        { top: '55%', left: '15%' }, // Centrocampista
        { top: '55%', left: '35%' },
        { top: '55%', left: '50%' },
        { top: '55%', left: '65%' },
        { top: '55%', left: '85%' },
        { top: '75%', left: '40%' }, // Delantero
        { top: '75%', left: '60%' }
      ],
      away: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '25%' }, // Defensor
        { top: '35%', left: '50%' },
        { top: '35%', left: '75%' },
        { top: '55%', left: '15%' }, // Centrocampista
        { top: '55%', left: '35%' },
        { top: '55%', left: '50%' },
        { top: '55%', left: '65%' },
        { top: '55%', left: '85%' },
        { top: '75%', left: '40%' }, // Delantero
        { top: '75%', left: '60%' }
      ]
    },
    '4-1-4-1': {
      home: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '20%' }, // Defensor
        { top: '35%', left: '40%' },
        { top: '35%', left: '60%' },
        { top: '35%', left: '80%' },
        { top: '50%', left: '50%' }, // Centrocampista defensivo
        { top: '65%', left: '20%' }, // Centrocampista ofensivo
        { top: '65%', left: '40%' },
        { top: '65%', left: '60%' },
        { top: '65%', left: '80%' },
        { top: '85%', left: '50%' }  // Delantero
      ],
      away: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '20%' }, // Defensor
        { top: '35%', left: '40%' },
        { top: '35%', left: '60%' },
        { top: '35%', left: '80%' },
        { top: '50%', left: '50%' }, // Centrocampista defensivo
        { top: '65%', left: '20%' }, // Centrocampista ofensivo
        { top: '65%', left: '40%' },
        { top: '65%', left: '60%' },
        { top: '65%', left: '80%' },
        { top: '85%', left: '50%' }  // Delantero
      ]
    },
    '4-4-1-1': {
      home: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '20%' }, // Defensor
        { top: '35%', left: '40%' },
        { top: '35%', left: '60%' },
        { top: '35%', left: '80%' },
        { top: '55%', left: '20%' }, // Centrocampista
        { top: '55%', left: '40%' },
        { top: '55%', left: '60%' },
        { top: '55%', left: '80%' },
        { top: '75%', left: '50%' }, // Media punta
        { top: '85%', left: '50%' }  // Delantero
      ],
      away: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '20%' }, // Defensor
        { top: '35%', left: '40%' },
        { top: '35%', left: '60%' },
        { top: '35%', left: '80%' },
        { top: '55%', left: '20%' }, // Centrocampista
        { top: '55%', left: '40%' },
        { top: '55%', left: '60%' },
        { top: '55%', left: '80%' },
        { top: '75%', left: '50%' }, // Media punta
        { top: '85%', left: '50%' }  // Delantero
      ]
    },
    '4-5-1': {
      home: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '20%' }, // Defensor
        { top: '35%', left: '40%' },
        { top: '35%', left: '60%' },
        { top: '35%', left: '80%' },
        { top: '55%', left: '10%' }, // Centrocampista
        { top: '55%', left: '30%' },
        { top: '55%', left: '50%' },
        { top: '55%', left: '70%' },
        { top: '55%', left: '90%' },
        { top: '75%', left: '50%' }  // Delantero
      ],
      away: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '20%' }, // Defensor
        { top: '35%', left: '40%' },
        { top: '35%', left: '60%' },
        { top: '35%', left: '80%' },
        { top: '55%', left: '10%' }, // Centrocampista
        { top: '55%', left: '30%' },
        { top: '55%', left: '50%' },
        { top: '55%', left: '70%' },
        { top: '55%', left: '90%' },
        { top: '75%', left: '50%' }  // Delantero
      ]
    },
    '3-4-3': {
      home: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '25%' }, // Defensor
        { top: '35%', left: '50%' },
        { top: '35%', left: '75%' },
        { top: '55%', left: '20%' }, // Centrocampista
        { top: '55%', left: '40%' },
        { top: '55%', left: '60%' },
        { top: '55%', left: '80%' },
        { top: '75%', left: '20%' }, // Delantero
        { top: '75%', left: '50%' },
        { top: '75%', left: '80%' }
      ],
      away: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '25%' }, // Defensor
        { top: '35%', left: '50%' },
        { top: '35%', left: '75%' },
        { top: '55%', left: '20%' }, // Centrocampista
        { top: '55%', left: '40%' },
        { top: '55%', left: '60%' },
        { top: '55%', left: '80%' },
        { top: '75%', left: '20%' }, // Delantero
        { top: '75%', left: '50%' },
        { top: '75%', left: '80%' }
      ]
    },
    '4-4-2 diamond': {
      home: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '20%' }, // Defensor
        { top: '35%', left: '40%' },
        { top: '35%', left: '60%' },
        { top: '35%', left: '80%' },
        { top: '50%', left: '50%' }, // Centrocampista defensivo
        { top: '60%', left: '20%' }, // Centrocampista
        { top: '60%', left: '40%' },
        { top: '60%', left: '60%' },
        { top: '60%', left: '80%' },
        { top: '75%', left: '35%' }, // Delantero
        { top: '75%', left: '65%' }
      ],
      away: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '20%' }, // Defensor
        { top: '35%', left: '40%' },
        { top: '35%', left: '60%' },
        { top: '35%', left: '80%' },
        { top: '50%', left: '50%' }, // Centrocampista defensivo
        { top: '60%', left: '20%' }, // Centrocampista
        { top: '60%', left: '40%' },
        { top: '60%', left: '60%' },
        { top: '60%', left: '80%' },
        { top: '75%', left: '35%' }, // Delantero
        { top: '75%', left: '65%' }
      ]
    },
    '3-1-4-2': {
      home: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '25%' }, // Defensor
        { top: '35%', left: '50%' },
        { top: '35%', left: '75%' },
        { top: '50%', left: '50%' }, // Centrocampista defensivo
        { top: '60%', left: '20%' }, // Centrocampista
        { top: '60%', left: '35%' },
        { top: '60%', left: '50%' },
        { top: '60%', left: '65%' },
        { top: '60%', left: '80%' },
        { top: '75%', left: '40%' }, // Delantero
        { top: '75%', left: '60%' }
      ],
      away: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '25%' }, // Defensor
        { top: '35%', left: '50%' },
        { top: '35%', left: '75%' },
        { top: '50%', left: '50%' }, // Centrocampista defensivo
        { top: '60%', left: '20%' }, // Centrocampista
        { top: '60%', left: '35%' },
        { top: '60%', left: '50%' },
        { top: '60%', left: '65%' },
        { top: '60%', left: '80%' },
        { top: '75%', left: '40%' }, // Delantero
        { top: '75%', left: '60%' }
      ]
    },
    '3-4-1-2': {
      home: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '25%' }, // Defensor
        { top: '35%', left: '50%' },
        { top: '35%', left: '75%' },
        { top: '55%', left: '20%' }, // Centrocampista
        { top: '55%', left: '40%' },
        { top: '55%', left: '60%' },
        { top: '55%', left: '80%' },
        { top: '70%', left: '50%' }, // Media punta
        { top: '80%', left: '40%' }, // Delantero
        { top: '80%', left: '60%' }
      ],
      away: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '25%' }, // Defensor
        { top: '35%', left: '50%' },
        { top: '35%', left: '75%' },
        { top: '55%', left: '20%' }, // Centrocampista
        { top: '55%', left: '40%' },
        { top: '55%', left: '60%' },
        { top: '55%', left: '80%' },
        { top: '70%', left: '50%' }, // Media punta
        { top: '80%', left: '40%' }, // Delantero
        { top: '80%', left: '60%' }
      ]
    },
    '3-2-4-1': {
      home: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '25%' }, // Defensor
        { top: '35%', left: '50%' },
        { top: '35%', left: '75%' },
        { top: '50%', left: '35%' }, // Centrocampista defensivo
        { top: '50%', left: '65%' },
        { top: '60%', left: '20%' }, // Centrocampista ofensivo
        { top: '60%', left: '35%' },
        { top: '60%', left: '50%' },
        { top: '60%', left: '65%' },
        { top: '60%', left: '80%' },
        { top: '75%', left: '50%' }  // Delantero
      ],
      away: [
        { top: '15%', left: '50%' },  // Portero
        { top: '35%', left: '25%' }, // Defensor
        { top: '35%', left: '50%' },
        { top: '35%', left: '75%' },
        { top: '50%', left: '35%' }, // Centrocampista defensivo
        { top: '50%', left: '65%' },
        { top: '60%', left: '20%' }, // Centrocampista ofensivo
        { top: '60%', left: '35%' },
        { top: '60%', left: '50%' },
        { top: '60%', left: '65%' },
        { top: '60%', left: '80%' },
        { top: '75%', left: '50%' }  // Delantero
      ]
    }
  };
  ngOnInit(): void {}

  getPlayerStyle(index: number, team: 'home' | 'away'): { top: string, left: string, transform: string } {
    const formationPositions = this.positions[this.formation] || { home: [], away: [] };
    const position = formationPositions[team][index] || { top: '0%', left: '0%' };
    return { ...position, transform: 'translate(-50%, -50%)' };
  }

  getFirstName(name: string): string {
    return name.split(' ')[0];
  }

  getLastName(name: string): string {
    const parts = name.split(' ');
    return parts.length > 1 ? parts.slice(1).join(' ') : '';
  }

  onFieldImageError(): void {
    this.fieldImage = this.backupFieldImage;
  }
    onTeamLogoError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/field.png'; // Ruta a una imagen de respaldo para el logotipo del equipo
  }
}