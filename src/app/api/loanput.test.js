/**
 * @jest-environment node
 */

jest.mock("../../models/prestamos");
jest.mock("../../models/usuarios");
jest.mock("../../models/libros");
jest.mock("next/server");
jest.mock("../../libs/mongodb");
jest.mock("axios");


const mockLoanFindById = jest.fn();
jest.mock("../../models/prestamos", () => ({
    findById: mockLoanFindById,
  }));
  

const mockUserFindById = jest.fn();
jest.mock("../../models/usuarios", () => ({
  findById: mockUserFindById,
}));

const mockBookSave = jest.fn();
const mockBookFindById = jest.fn();
jest.mock("../../models/libros", () => ({
  findById: mockBookFindById,
  prototype: { save: mockBookSave },
}));

jest.mock("next/server", () => {
  const mockedJson = jest.fn();

  return {
    NextResponse: {
      json: (...args) => {
        mockedJson(...args);
        return { status: args[0]?.status || 200 };
      },
    },
    __mockedJson: mockedJson,
  };
});

const { __mockedJson: mockedJson } = require("next/server");
const {  PUT } = require("./loan/route");
const { connectDB } = require("../../libs/mongodb");



describe("PUT /api/loan/:id", () => {
  

  it("successfully updates a loan", async () => {
    // Configurar mocks de solicitud y datos
    const mockJson = jest.fn().mockResolvedValue({
      loanId: "loanId",
    });

    const mockRequest = {
      json: mockJson,
    };

    // Mocks de la base de datos y de los modelos
    connectDB.mockResolvedValue();

    const mockedLoan = {
      _id: "loanId",
      status: "PRESTADO",
      book: "bookId",
      user: "userId",
      save: jest.fn().mockResolvedValue({}),
    };

    mockLoanFindById.mockResolvedValue(mockedLoan);

    const mockedBook = {
      _id: "bookId",
      copiesAvailable: 17,
      save: jest.fn().mockResolvedValue({}),
    };

    mockBookFindById.mockResolvedValue(mockedBook);

    // Ejecutar la función PUT
    const response = await PUT(mockRequest);

    // Verificaciones
    expect(mockJson).toHaveBeenCalled();
    expect(connectDB).toHaveBeenCalled();
    expect(mockLoanFindById).toHaveBeenCalledWith("loanId");
    expect(mockedLoan.save).toHaveBeenCalled();
    expect(mockBookFindById).toHaveBeenCalledWith("bookId");
    expect(mockedBook.save).toHaveBeenCalled();
    // Asegurarse de que se devolvió la respuesta correcta
    expect(mockedJson).toHaveBeenCalledWith({
        message: "Devolución realizada correctamente",
      });
  });

  // Aquí podrías agregar más pruebas para manejar casos de error
});
