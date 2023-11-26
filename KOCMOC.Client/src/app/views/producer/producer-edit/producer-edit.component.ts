import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
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

  loading: boolean = false;

  constructor(
    private enumUtilityService: EnumUtilityService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private producerService: ProducerService,
    private router: Router,
    private notificationService: NotificationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.initEnumValues();
    this.initReactiveForm();
    this.checkRouteParams();
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private initEnumValues(): void {
    this.producerRoles = this.enumUtilityService.getEnumValues(ProducerRole);
    this.producerStatus = this.enumUtilityService.getEnumValues(ProducerStatus);
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
          this.setFormDefaultValues();
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
      name: ['', [Validators.required, Validators.maxLength(15)]],
      description: ['', Validators.maxLength(15)],
      imageURL: ['', Validators.maxLength(15)],
      producerRole: ['', Validators.required],
      producerStatus: ['', Validators.required],
    });
  }

  private setFormDefaultValues(): void {
    this.producerForm.get('producerRole')?.setValue(0);
    this.producerForm.get('producerStatus')?.setValue(0);
  }

  private getEntityById(id: number): void {
    this.loading = true;
    this.producerService
      .getProducerById(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (producer: Producer) => {
          this.entity = producer;
          this.producerForm.patchValue(producer);
          console.log(
            `Entity with ID ${id} successfully retrieved and form populated.`
          );
        },
        error: (error) => {
          console.error(`Error fetching entity with ID ${id}:`, error);
        },
        complete: () => {
          console.log(`Completed request to fetch entity with ID ${id}.`);
          this.loading = false;
        },
      });
  }

  saveEntity(): void {
    if (this.producerForm.valid) {
      this.loading = true;

      let producerData: Producer = { ...this.producerForm.value };

      if (this.entityId) {
        producerData.id = this.entityId;

        this.producerService
          .updateProducer(this.entityId, producerData)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: (response) => {
              this.entity = response;
              this.notificationService.show(
                `Producer '${response.name}' updated successfully`
              );
              console.log('Producer updated successfully:', response);
            },
            error: (error) => {
              console.error('Error updating producer:', error);
              this.notificationService.show('Error updating producer', 5000);
            },
            complete: () => {
              console.log('Update producer request completed');
              this.loading = false;
            },
          });
      } else {
        this.producerService
          .addProducer(producerData)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: (response) => {
              this.entity = response;
              this.notificationService.show(
                `Producer '${response.name}' added successfully`
              );
              console.log('Producer added successfully:', response);
              if (response && response.id) {
                this.router.navigate(['/producer/edit', response.id]);
              }
            },
            error: (error) => {
              console.error('Error adding producer:', error);
              this.notificationService.show('Error adding producer', 5000);
            },
            complete: () => { 
              console.log('Add producer request completed');
            },
          });
      }
    } else {
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched(): void {
    Object.keys(this.producerForm.controls).forEach(field => {
      const control = this.producerForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  deleteEntity(): void {
    if (this.entityId && confirm("Are you sure you want to delete this producer?")) {
      this.loading = true;
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
            this.loading = false;
            this.router.navigate(['/producers']);
          },
        });
    }
  }

  back(): void {
    this.location.back();
  }
}
