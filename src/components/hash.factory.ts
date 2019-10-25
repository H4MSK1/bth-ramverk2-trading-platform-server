import * as bcrypt from 'bcryptjs';

class Hasher {
  private readonly rounds: number = 10;

  constructor(private readonly value: string) {}

  async generateHash(): Promise<string> {
    const salt = await bcrypt.genSalt(this.rounds);
    return await bcrypt.hash(this.value, salt);
  }

  async compareHash(hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(this.value, hash);
    } catch {
      return false;
    }
  }
}

export const HashFactory = (value: string) => new Hasher(value);
