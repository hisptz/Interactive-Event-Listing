import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { rootEffects } from './store/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxDhis2MenuModule } from '@hisptz/ngx-dhis2-menu';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import * as filters from './modules';
import * as fromContainers from './containers';
import * as fromComponents from './components';

@NgModule({
  declarations: [AppComponent, ...fromContainers.containers, ...fromComponents.components],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    NgxDhis2MenuModule.forRoot(),
    ...filters.modules,
    /**
     * Module for registering service worker
     */
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    /**
     * Module for registering ngrx store reducers
     */
    StoreModule.forRoot(reducers, { metaReducers }),

    /**
     * Module for registering ngrx store side effects
     */
    EffectsModule.forRoot(rootEffects),

    /**
     * Development tool for debugging ngrx store operations
     */
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
