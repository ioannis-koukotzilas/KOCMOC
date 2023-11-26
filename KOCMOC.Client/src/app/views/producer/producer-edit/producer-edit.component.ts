import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumUtilityService } from 'src/app/services/enum-utility.service';
import { ProducerService } from '../producer.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProducerRole } from 'src/app/models/enums/producerRole';
import { ProducerStatus } from 'src/app/models/enums/producerStatus';
import { Producer } from 'src/app/models/entities/producer';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-producer-edit',
  templateUrl: './producer-edit.component.html',
  styleUrls: ['./producer-edit.component.css'],
})
export class ProducerEditComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  entityId: number | null = null;
  entity: Producer | null = null;

  producerRoles: { name: string; value: number }[];
  producerStatus: { name: string; value: number }[];

  producerForm: FormGroup;

  constructor(
    private enumUtilityService: EnumUtilityService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private producerService: ProducerService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.producerRoles = this.enumUtilityService.getEnumValues(ProducerRole);
    this.producerStatus = this.enumUtilityService.getEnumValues(ProducerStatus);
    this.initReactiveForm();
    this.checkRouteParams();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private checkRouteParams(): void {
    this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id && id !== '0') {
          this.entityId = +id;
          this.getEntityById(+id);
        } else {
          this.producerForm.reset();
          this.entityId = null;
        }
      },
      error: (error) => {
        console.error('Error processing route parameters:', error);
      },
      complete: () => {
        console.log('Route parameter processing completed.');
      },
    });
  }

  private initReactiveForm(): void {
    this.producerForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      imageURL: [''],
      producerRole: [0, Validators.required],
      producerStatus: [0, Validators.required],
    });
  }

  private getEntityById(id: number): void {
    this.producerService
      .getProducerById(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (producer: Producer) => {
          this.entity = producer;
          this.producerForm.patchValue({
            name: producer.name,
            description: producer.description,
            imageURL: producer.imageURL,
            producerRole: producer.producerRole,
            producerStatus: producer.producerStatus,
          });
          console.log(
            `Entity with ID ${id} successfully retrieved and form populated.`
          );
        },
        error: (error) => {
          console.error(`Error fetching entity with ID ${id}:`, error);
        },
        complete: () => {
          console.log(`Completed request to fetch entity with ID ${id}.`);
        },
      });
  }

  saveEntity(): void {
    if (this.producerForm.valid) {
      let producerData: Producer = { ...this.producerForm.value };

      if (this.entityId) {
        producerData.id = this.entityId;

        this.producerService
          .updateProducer(this.entityId, producerData)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: (response) => {
              console.log('Producer updated successfully:', response);
              this.notificationService.show(
                `Producer '${response.name}' updated successfully`
              );
            },
            error: (error) => {
              console.error('Error updating producer:', error);
              this.notificationService.show('Error updating producer', 5000);
            },
            complete: () => console.log('Update producer request completed'),
          });
      } else {
        this.producerService
          .addProducer(producerData)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: (response) => {
              console.log('Producer added successfully:', response);
              this.notificationService.show(
                `Producer '${response.name}' added successfully`
              );
              if (response && response.id) {
                this.router.navigate(['/producer/edit', response.id]);
              }
            },
            error: (error) => {
              console.error('Error adding producer:', error);
              this.notificationService.show('Error adding producer', 5000);
            },
            complete: () => console.log('Add producer request completed'),
          });
      }
    }
  }

  deleteEntity(): void {
    if (this.entityId) {
      this.producerService
        .deleteProducer(this.entityId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: () => {
            console.log(
              `Producer with ID ${this.entityId} deleted successfully`
            );
            this.notificationService.show(
              `Producer '${this.entity?.name}' deleted successfully`
            );
          },
          error: (error) => {
            console.error(`Error deleting producer:`, error);
            this.notificationService.show('Error deleting producer', 5000);
          },
          complete: () => {
            this.router.navigate(['/producers']);
          },
        });
    }
  }
}
