import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextControl } from './text-control';

describe('TextInput', () => {
	let component: TextControl;
	let fixture: ComponentFixture<TextControl>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TextControl]
		}).compileComponents();

		fixture = TestBed.createComponent(TextControl);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
