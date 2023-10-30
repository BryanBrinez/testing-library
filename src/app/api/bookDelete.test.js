/**
 * @jest-environment node
 */

jest.mock("../../models/libros");
jest.mock("next/server");
jest.mock("../../libs/mongodb");

// Mocks específicos para esta prueba
const mockBookFindByIdAndDelete = jest.fn();
jest.mock("../../models/libros", () => ({
  findByIdAndDelete: mockBookFindByIdAndDelete,
}));

jest.mock('next/server', () => {
    const mockedJson = jest.fn();
  
    return {
      NextResponse: {
        json: (...args) => {
          mockedJson(...args);
          return { status: args[0]?.status || 200 };
        },
      },
      __mockedJson: mockedJson
    };
  });

const { __mockedJson: mockedJson } = require("next/server");
const { DELETE } = require("./book/route");  // Asegúrate de ajustar la ruta según tu estructura de archivos
const { connectDB } = require("../../libs/mongodb");

describe("DELETE /api/book/:id", () => {
  
  it("returns error when no bookId is provided", async () => {
    // Configurar un mockRequest sin bookId
    const mockJson = jest.fn().mockResolvedValue({});
    const mockRequest = {
      json: mockJson,
    };

    connectDB.mockResolvedValue();

    // Ejecutar la función DELETE
    const response = await DELETE(mockRequest);

    // Verificaciones
    expect(mockJson).toHaveBeenCalled();
    expect(connectDB).toHaveBeenCalled();
    expect(mockBookFindByIdAndDelete).not.toHaveBeenCalled();  // Verificar que findByIdAndDelete no se llamó
    expect(mockedJson).toHaveBeenCalledWith({ message: "Book ID is required" }, { status: 400 });
  });

  it("successfully deletes a book with valid bookId", async () => {
    // Simular un bookId válido
    const validBookId = "12345";
    const mockRequest = { json: jest.fn().mockResolvedValue({ bookId: validBookId }) };

    // Configurar mocks de la base de datos
    connectDB.mockResolvedValue();
    mockBookFindByIdAndDelete.mockResolvedValue({ _id: validBookId }); // Simular una respuesta exitosa

    // Llamada a la función DELETE
    const response = await DELETE(mockRequest);

    // Verificaciones
    expect(mockBookFindByIdAndDelete).toHaveBeenCalledWith(validBookId); // Verificar que se llamó con el bookId correcto
    expect(response).toEqual(expect.anything()); // Ajustar según lo que devuelve tu función
    // Verificar la respuesta adecuada, por ejemplo, un mensaje de confirmación
    expect(mockedJson).toHaveBeenCalledWith({ message: "Book successfully deleted" });
  });

  

  // Aquí podrías agregar más pruebas para otros escenarios, como cuando se proporciona un bookId válido o inválido.
});
