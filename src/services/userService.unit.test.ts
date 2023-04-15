import * as servicesDatabase from './userServices';
import { UserMysql, productsMysql, productsInstances} from '../models/modelMysql';

describe('Inserting, retrieving and manipulating data in the database', () => {

    beforeAll(async () => {
        await UserMysql.sync({force: true})
        await productsMysql.sync({force: true});
            
    });

    let userDataTest= {
        firstName:'Kelvem',
        lastName: 'Loubach',
        email: 'kelvemloubach@outlook.com',
        password: '123456789',
        id: 1
    };

    let productsTest = {
        product_cod: 12,
        qt_itens: 50,
        product_description: 'Produto qualquer',
        product_value: 65.32,
        cost_price: 32.65,
        productSold: false,
        client_id: 1
    }
    
    // Teste da função serviceCreateUser.
    it('Need to create a user if there is no email registered in the database.', async () => {
        const user = await servicesDatabase.serviceCreateUser(userDataTest.firstName, userDataTest.lastName, userDataTest.email, userDataTest.password);
        expect(user).not.toBeUndefined();
        expect(user?.newUser.firstName).toStrictEqual(userDataTest.firstName);

    });

    // Teste da função serviceCreateUser.
    it('Need to return false in the create property.', async () => {
        const user = await servicesDatabase.serviceCreateUser(userDataTest.firstName, userDataTest.lastName, userDataTest.email, userDataTest.password);
        expect(user?.create).toBeFalsy();
       
    });

    // Teste da função de login.
    it('it needs to return a user instance if it exists, otherwise it needs to return null, and also check the match between the hash and the typed password.', async () => {
        const user = await servicesDatabase.login(userDataTest.email, userDataTest.password);
        expect(user).not.toBeUndefined();
        expect(user?.matchPassword).toBeTruthy();
        expect(typeof user?.id).toBe('number');
    });

    // Teste da função de login.
    it('It needs to return the user object as not being undefined and the matchPassword property as false.', async () => {
        const user = await servicesDatabase.login(userDataTest.email, '12345678');
        expect(user).not.toBeUndefined();
        expect(user?.matchPassword).toBeFalsy();
    });

    // Teste da função creatProducts
    it('Need to register a new product in the database.', async () => {
        const products = await servicesDatabase.creatProducts(productsTest.client_id, productsTest.cost_price, productsTest.product_value, productsTest.product_description, productsTest.qt_itens, productsTest.product_cod) as productsInstances;
        expect(products.cost_price).toStrictEqual(productsTest.cost_price);
        expect(products).not.toBeInstanceOf(Error);
    });

    // Teste para função listProducts
    it('Must return an instance of products.', async () => {
        const Products = await servicesDatabase.listProducts(userDataTest.id);
      
        expect(Products).not.toBeInstanceOf(Error);
        expect(Products).toHaveProperty('getProducts');
        expect(Products).toHaveProperty('productMoreDear');
    });


    

    afterAll(async () => {
        await productsMysql.drop();
        await UserMysql.drop();
      });
});
