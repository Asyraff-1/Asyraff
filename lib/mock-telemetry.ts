import { TelemetryData } from './types';

class TelemetryGenerator {
  private baseTemperature = 24.5;
  private baseHumidity = 45;
  private bufferSize = 30;

  private generateRandomValue(base: number, variance: number): number {
    return base + (Math.random() * variance * 2 - variance);
  }

  public generateDataPoint(deviceId: string): TelemetryData {
    this.baseTemperature = this.generateRandomValue(this.baseTemperature, 0.2);
    this.baseHumidity = this.generateRandomValue(this.baseHumidity, 0.5);

    const voltage = this.generateRandomValue(220, 2);
    const current = this.generateRandomValue(10, 0.5);
    const activePower = voltage * current * 0.95; // Assuming 0.95 PF

    const distance = Math.max(0, this.generateRandomValue(200, 50));
    let motionState: 'Moving' | 'Static' | 'Absent' = 'Absent';
    if (distance > 0 && distance < 400) {
       motionState = Math.random() > 0.3 ? 'Moving' : 'Static';
    }

    return {
      id: deviceId,
      timestamp: Date.now(),
      power: {
        voltage: Number(voltage.toFixed(2)),
        current: Number(current.toFixed(2)),
        activePower: Number(activePower.toFixed(2)),
        cumulativeKwh: Number((Math.random() * 1000).toFixed(2)) // mock
      },
      environmental: {
        temperature: Number(this.baseTemperature.toFixed(2)),
        humidity: Number(this.baseHumidity.toFixed(2)),
        aqi: Math.floor(this.generateRandomValue(50, 10))
      },
      spatial: {
        distance: Number(distance.toFixed(0)),
        motionState
      }
    };
  }
}

export const telemetryGenerator = new TelemetryGenerator();
