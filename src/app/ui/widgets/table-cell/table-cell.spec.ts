import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellItem } from './table-cell';

describe('TableCell', () => {
	let component: TableCellItem;
	let fixture: ComponentFixture<TableCellItem>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TableCell]
		}).compileComponents();

		fixture = TestBed.createComponent(TableCell);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
