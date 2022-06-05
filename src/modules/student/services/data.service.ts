import { getRandomNumber } from '../helpers';
import { IStudent } from '../interfaces';

class DataService {
  public generate(): IStudent[] {
    const amountOfStudents = getRandomNumber(2, 7);
    return this.generateByAmountOfStudents(amountOfStudents);
  }

  public generateMany(
    maxAmountOfStudents: number,
    amountOfSame: number
  ): IStudent[][] {
    const groups = [] as IStudent[][];
    for (let i = 2; i <= maxAmountOfStudents; i++) {
      for (let j = 0; j < amountOfSame; j++) {
        groups.push(this.generateByAmountOfStudents(i));
      }
    }
    return groups;
  }

  private generateByAmountOfStudents(amountOfStudents: number): IStudent[] {
    const students = [] as IStudent[];
    for (let i = 0; i < amountOfStudents; i++) {
      const r = getRandomNumber(0, 21);
      const t = getRandomNumber(5, 31);
      const d = getRandomNumber(r + t, 101);
      students.push({ i: i + 1, r, t, d, fullName: `Студент №${i + 1}` });
    }
    return students;
  }
}

const dataService = new DataService();

export { dataService };
