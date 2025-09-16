import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityNameForm } from './entity-name-form';

describe('EntityCreate', () => {
	let component: EntityNameForm;
	let fixture: ComponentFixture<EntityNameForm>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EntityNameForm]
		}).compileComponents();

		fixture = TestBed.createComponent(EntityNameForm);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
