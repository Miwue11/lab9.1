export type TipoIva =
  | "general"
  | "reducido"
  | "superreducidoA"
  | "superreducidoB"
  | "superreducidoC"
  | "sinIva";

export interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIva;
}

export interface LineaTicket {
  producto: Producto;
  cantidad: number;
}

const productos: LineaTicket[] = [
  {
    producto: {
      nombre: "Legumbres",
      precio: 2,
      tipoIva: "general",
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: "Perfume",
      precio: 20,
      tipoIva: "general",
    },
    cantidad: 3,
  },
  {
    producto: {
      nombre: "Leche",
      precio: 1,
      tipoIva: "superreducidoC",
    },
    cantidad: 6,
  },
  {
    producto: {
      nombre: "Lasaña",
      precio: 5,
      tipoIva: "superreducidoA",
    },
    cantidad: 1,
  },
  {
    producto: {
      nombre: "Papel higiénico",
      precio: 1,
      tipoIva: "superreducidoB",
    },
    cantidad: 3,
  },
  {
    producto: {
      nombre: "Cerveza",
      precio: 1,
      tipoIva: "reducido",
    },
    cantidad: 12,
  },
  {
    producto: {
      nombre: "Vino",
      precio: 2,
      tipoIva: "reducido",
    },
    cantidad: 3,
  },
  {
    producto: {
      nombre: "Café",
      precio: 1,
      tipoIva: "general",
    },
    cantidad: 6,
  },
  {
    producto: {
      nombre: "Agua",
      precio: 1,
      tipoIva: "sinIva",
    },
    cantidad: 6,
  },
  {
    producto: {
      nombre: "Chocolate",
      precio: 1,
      tipoIva: "reducido",
    },
    cantidad: 6,
  },
  {
    producto: {
      nombre: "Galletas",
      precio: 1,
      tipoIva: "reducido",
    },
    cantidad: 3,
  },
  {
    producto: {
      nombre: "Patatas",
      precio: 1,
      tipoIva: "superreducidoC",
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: "Tomate",
      precio: 1,
      tipoIva: "superreducidoC",
    },
    cantidad: 1,
  },
  {
    producto: {
      nombre: "Ibuprofeno",
      precio: 6,
      tipoIva: "superreducidoB",
    },
    cantidad: 3,
  },
  {
    producto: {
      nombre: "Microhondas",
      precio: 120,
      tipoIva: "general",
    },
    cantidad: 1,
  },
];

export interface ResultadoLineaTicket {
  nombre: string;
  cantidad: number;
  precioSinIva: number;
  tipoIva: TipoIva;
  precioConIva: number;
}

export interface ResultadoTotalTicket {
  totalSinIva: number;
  totalConIva: number;
  totalIva: number;
}

export interface TotalPorTipoIva {
  tipoIva: TipoIva;
  cuantia: number;
}

export interface TicketFinal {
  lineas: ResultadoLineaTicket[];
  total: ResultadoTotalTicket;
  desgloseIva: TotalPorTipoIva[];
}

export const __TIPOSDEIVA = {
  general: 0.21,
  reducido: 0.1,
  superreducidoA: 0.05,
  superreducidoB: 0.04,
  superreducidoC: 0.0,
  sinIva: 0,
};

export const calculaPrecios = (linea: LineaTicket) => {
  const rate = __TIPOSDEIVA[linea.producto.tipoIva];
  const precioSinIva = linea.producto.precio * linea.cantidad;
  const precioConIva = parseFloat((precioSinIva * (1 + rate)).toFixed(2));
  const ivaAplicado = parseFloat((precioConIva - precioSinIva).toFixed(2));
  return { precioSinIva, precioConIva, ivaAplicado };
};

export const actualizaTotales = (
  total: ResultadoTotalTicket,
  precioSinIva: number,
  precioConIva: number,
  ivaAplicado: number
) => {
  total.totalSinIva += precioSinIva;
  total.totalConIva += precioConIva;
  total.totalIva += ivaAplicado;
  return total;
};

export const actualizaDesglose = (
  desgloseIva: TotalPorTipoIva[],
  tipoIva: TipoIva,
  ivaAplicado: number
) => {
  const item = desgloseIva.find((d) => d.tipoIva === tipoIva);
  if (item) {
    item.cuantia += ivaAplicado;
  } else {
    desgloseIva.push({ tipoIva, cuantia: ivaAplicado });
  }
  return desgloseIva;
};

export const creaLineaResultado = (
  linea: LineaTicket,
  precioSinIva: number,
  precioConIva: number
): ResultadoLineaTicket => ({
  nombre: linea.producto.nombre,
  cantidad: linea.cantidad,
  precioSinIva: precioSinIva,
  tipoIva: linea.producto.tipoIva,
  precioConIva,
});

export const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  return lineasTicket.reduce(
    (ticket, linea) => {
      const { precioSinIva, precioConIva, ivaAplicado } = calculaPrecios(linea);
      actualizaTotales(ticket.total, precioSinIva, precioConIva, ivaAplicado);
      actualizaDesglose(
        ticket.desgloseIva,
        linea.producto.tipoIva,
        ivaAplicado
      );
      ticket.lineas.push(creaLineaResultado(linea, precioSinIva, precioConIva));
      return ticket;
    },
    {
      lineas: [],
      total: { totalSinIva: 0, totalConIva: 0, totalIva: 0 },
      desgloseIva: [],
    } as TicketFinal
  );
};
console.log(calculaTicket(productos));
