/**
 * @jest-environment node
 */

jest.mock("../../models/prestamos");
jest.mock("../../models/usuarios");
jest.mock("../../models/libros");
jest.mock("next/server");
jest.mock("../../libs/mongodb");
jest.mock("axios");

const mockLoanSave = jest.fn();
jest.mock("../../models/prestamos", () => {
  return jest.fn().mockImplementation(() => {
    return {
      
      save: mockLoanSave,
    };
  })
  
});




const mockLoanFindById = jest.fn();
jest.mock("./models/prestamos", () => {
    return jest.fn().mockImplementation(() => {
      return {
        
        findById: mockLoanFindById,
      };
    })
    
  });





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
const { POST, PUT } = require("./loan/route");
const { connectDB } = require("../../libs/mongodb");

describe("POST /api/loan", () => {
  it("successfully creates a loan", async () => {
    const mockJson = jest.fn().mockResolvedValue({
      book: "bookId",
      user: "userId",
    });

    const mockRequest = {
      json: mockJson,
    };

    connectDB.mockResolvedValue();

    mockUserFindById.mockResolvedValue({
      _id: "userId",
      name: "Gustavo",
      address: "lejos de aqui",
      phone: "555555",
      __v: 0,
    });

    const mockedBook = {
      _id: "bookId",
      title: "La maravilla",
      author: "Austin Santos",
      copiesAvailable: 18,
      __v: 0,
      save: jest.fn().mockResolvedValue({}),
    };

    mockBookFindById.mockResolvedValue(mockedBook);

    mockLoanSave.mockResolvedValue({ _id: "someId" });

    const response = await POST(mockRequest);

    expect(mockJson).toHaveBeenCalled();
    expect(connectDB).toHaveBeenCalled();
    expect(mockUserFindById).toHaveBeenCalledWith("userId");
    expect(mockBookFindById).toHaveBeenCalledWith("bookId");
    expect(mockedBook.save).toHaveBeenCalled();
    expect(mockLoanSave).toHaveBeenCalled();
    expect(mockedJson).toHaveBeenCalledWith({
      message: "Prestamo hecho correctamente",
    });
  });
});


