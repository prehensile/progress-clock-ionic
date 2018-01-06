import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { ProgressClockComponent } from './progress-clock/progress-clock';
@NgModule({
	declarations: [ProgressBarComponent,
    ProgressClockComponent],
	imports: [],
	exports: [ProgressBarComponent,
    ProgressClockComponent]
})
export class ComponentsModule {}
