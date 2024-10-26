import { CommonModule } from "@angular/common";
import{ NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
    exports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
})
export class SharedModule{}