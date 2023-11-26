import { ProducerRole } from '../enums/producerRole';
import { ProducerStatus } from '../enums/producerStatus';

export class Producer {
  id: number;
  createdDate: Date;
  modifiedDate: Date | null;
  name: string;
  description: string | null;
  imageURL: string | null;
  producerRole: ProducerRole;
  producerStatus: ProducerStatus;
}
