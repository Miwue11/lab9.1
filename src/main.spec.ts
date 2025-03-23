import {
  calculaPrecios,
  calculaTicket,
  actualizaTotales,
  actualizaDesglose,
} from "./main";
import { LineaTicket, ResultadoTotalTicket, TotalPorTipoIva } from "./modelo";

describe("Calcula precios", () => {
  it("calcula precios correctamente", () => {
    // Arrange
    const linea: LineaTicket = {
      producto: { nombre: "Producto 1", tipoIva: "reducido", precio: 100 },
      cantidad: 1,
    };
    // Act
    const resultado = calculaPrecios(linea);
    // Assert
    expect(resultado).toEqual({
      precioSinIva: 100,
      precioConIva: 110,
      ivaAplicado: 10,
    });

    it("calcula precios correctamente", () => {
      // Arrange
      const linea: LineaTicket = {
        producto: { nombre: "Producto 2", precio: 100, tipoIva: "general" },
        cantidad: 1,
      };
      // Act
      const resultado = calculaPrecios(linea);
      // Assert
      expect(resultado).toEqual({
        precioSinIva: 100,
        precioConIva: 121,
        ivaAplicado: 21,
      });
    });
  });
  it("calcula precios correctamente", () => {
    // Arrange
    const linea: LineaTicket = {
      producto: {
        nombre: "Producto 3",
        precio: 100,
        tipoIva: "superreducidoA",
      },
      cantidad: 1,
    };
    // Act
    const resultado = calculaPrecios(linea);
    // Assert
    expect(resultado).toEqual({
      precioSinIva: 100,
      precioConIva: 105,
      ivaAplicado: 5,
    });
  });
  it("calcula precios correctamente", () => {
    // Arrange
    const linea: LineaTicket = {
      producto: {
        nombre: "Producto 4",
        precio: 100,
        tipoIva: "superreducidoB",
      },
      cantidad: 1,
    };
    // Act
    const resultado = calculaPrecios(linea);
    // Assert
    expect(resultado).toEqual({
      precioSinIva: 100,
      precioConIva: 104,
      ivaAplicado: 4,
    });
  });
});

describe("calculaTicket", () => {
  it("calcula ticket correctamente", () => {
    // Arrange
    const lineas: LineaTicket[] = [
      {
        producto: {
          nombre: "Producto 1",
          precio: 100,
          tipoIva: "reducido",
        },
        cantidad: 1,
      },
      {
        producto: {
          nombre: "Producto 2",
          precio: 100,
          tipoIva: "general",
        },
        cantidad: 1,
      },
      {
        producto: {
          nombre: "Producto 3",
          precio: 100,
          tipoIva: "superreducidoA",
        },
        cantidad: 1,
      },
      {
        producto: {
          nombre: "Producto 4",
          precio: 100,
          tipoIva: "superreducidoB",
        },
        cantidad: 1,
      },
    ];
    // Act
    const resultado = calculaTicket(lineas);
    // Assert
    expect(resultado).toEqual({
      lineas: [
        {
          nombre: "Producto 1",
          cantidad: 1,
          precioSinIva: 100,
          tipoIva: "reducido",
          precioConIva: 110,
        },
        {
          nombre: "Producto 2",
          cantidad: 1,
          precioSinIva: 100,
          tipoIva: "general",
          precioConIva: 121,
        },
        {
          nombre: "Producto 3",
          cantidad: 1,
          precioSinIva: 100,
          tipoIva: "superreducidoA",
          precioConIva: 105,
        },
        {
          nombre: "Producto 4",
          cantidad: 1,
          precioSinIva: 100,
          tipoIva: "superreducidoB",
          precioConIva: 104,
        },
      ],
      total: {
        totalSinIva: 400,
        totalConIva: 440,
        totalIva: 40,
      },
      desgloseIva: [
        { tipoIva: "reducido", cuantia: 10 },
        { tipoIva: "general", cuantia: 21 },
        { tipoIva: "superreducidoA", cuantia: 5 },
        { tipoIva: "superreducidoB", cuantia: 4 },
      ],
    });
  });
});

describe("actualizaTotales", () => {
  it("actualiza totales correctamente", () => {
    // Arrange
    const ticket: ResultadoTotalTicket = {
      totalSinIva: 400,
      totalConIva: 440,
      totalIva: 40,
    };
    const resultado = actualizaTotales(ticket, 100, 110, 10);
    expect(resultado).toEqual({
      totalSinIva: 500,
      totalConIva: 550,
      totalIva: 50,
    });
  });
  it("actualiza totales correctamente", () => {
    const ticket: ResultadoTotalTicket = {
      totalSinIva: 400,
      totalConIva: 440,
      totalIva: 40,
    };
    // Act
    const resultado = actualizaTotales(ticket, 100, 121, 21);
    // Assert
    expect(resultado).toEqual({
      totalSinIva: 500,
      totalConIva: 561,
      totalIva: 61,
    });
  });
});

describe("actualizarDesglose", () => {
  it("actualiza el desglose correctamente", () => {
    // Arrange
    const ticket: TotalPorTipoIva[] = [
      { tipoIva: "reducido", cuantia: 10 },
      { tipoIva: "general", cuantia: 21 },
      { tipoIva: "superreducidoA", cuantia: 5 },
      { tipoIva: "superreducidoB", cuantia: 4 },
    ];
    // Act
    const resultado = actualizaDesglose(ticket, "reducido", 10);
    // Assert
    expect(resultado).toEqual([
      { tipoIva: "reducido", cuantia: 20 },
      { tipoIva: "general", cuantia: 21 },
      { tipoIva: "superreducidoA", cuantia: 5 },
      { tipoIva: "superreducidoB", cuantia: 4 },
    ]);
  });
  it("actualiza el desglose correctamente", () => {
    // Arrange
    const ticket: TotalPorTipoIva[] = [
      { tipoIva: "reducido", cuantia: 10 },
      { tipoIva: "general", cuantia: 21 },
      { tipoIva: "superreducidoA", cuantia: 5 },
      { tipoIva: "superreducidoB", cuantia: 4 },
    ];
    // Act
    const resultado = actualizaDesglose(ticket, "general", 21);
    // Assert
    expect(resultado).toEqual([
      { tipoIva: "reducido", cuantia: 10 },
      { tipoIva: "general", cuantia: 42 },
      { tipoIva: "superreducidoA", cuantia: 5 },
      { tipoIva: "superreducidoB", cuantia: 4 },
    ]);
  });
});
