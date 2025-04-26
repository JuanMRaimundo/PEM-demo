import { NgModule } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { MegaMenuModule } from 'primeng/megamenu';

@NgModule({
  exports: [PasswordModule, MegaMenuModule],
})
export class primeNgModule {}
