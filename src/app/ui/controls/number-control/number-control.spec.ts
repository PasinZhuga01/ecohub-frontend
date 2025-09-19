import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberControl } from './number-control';

describe('NumberInput', () => {
	let component: NumberControl;
	let fixture: ComponentFixture<NumberControl>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NumberControl]
		}).compileComponents();

		fixture = TestBed.createComponent(NumberControl);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
