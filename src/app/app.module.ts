import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './firebase.config';
import { routes } from './router.config';
import { GenericService } from './services/generic.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth.guard';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { CadastrarComponent } from './components/cadastrar/cadastrar.component';
import { StorageService } from './services/storage.service';
import { ValoresComponent } from './components/valores/valores.component';
import { CoresComponent } from './components/cores/cores.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ProdutosComponent } from './components/produtos/produtos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { SubcategoriasComponent } from './components/subcategorias/subcategorias.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CadastrarComponent,
    ValoresComponent,
    CoresComponent,
    LoadingComponent,
    ProdutosComponent,
    UsuariosComponent,
    PedidosComponent,
    SubcategoriasComponent,
    
  ],

  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CurrencyMaskModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
  
  ],
  providers: [GenericService, StorageService, AngularFireAuth, AngularFireModule, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
