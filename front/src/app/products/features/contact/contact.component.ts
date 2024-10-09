import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-contact',
    standalone: true,
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
    imports: [CommonModule, ReactiveFormsModule],
})
export class ContactComponent {
    contactForm: FormGroup;
    constructor(private fb: FormBuilder) {
        this.contactForm = this.fb.group({
            nom: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            message: ['', [Validators.required, Validators.maxLength(300)]]
        });
    }

    onSubmit() {
        if (this.contactForm.valid) {
            alert('Message envoyé ');
            this.contactForm.reset();
        } else {
            alert('Veuillez remplir correctement le formulaire.');
        }
    }
}