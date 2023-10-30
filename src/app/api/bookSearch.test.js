/**
 * @jest-environment node
 */

jest.mock("../../models/libros");
jest.mock("next/server");
jest.mock("../../libs/mongodb");

const mockBookFindOne = jest.fn();
jest.mock("../../models/libros", () => ({
  findOne: mockBookFindOne,
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
const { GET } = require("./book/[search]/route");
const { connectDB } = require("../../libs/mongodb");

describe("GET /api/book", () => {
  it("successfully fetches a book by author or title", async () => {
    const searchQuery = "Austin Santos"; // Puedes cambiar esto para probar diferentes búsquedas

    const mockParams = {
      params: { search: searchQuery },
    };

    connectDB.mockResolvedValue();

    const mockedBook = {
      _id: "bookId",
      title: "La maravilla",
      author: "Austin Santos",
      copiesAvailable: 18,
      __v: 0
    };

    mockBookFindOne.mockResolvedValue(mockedBook);

    const response = await GET(null, mockParams);

    expect(connectDB).toHaveBeenCalled();
    expect(mockBookFindOne).toHaveBeenCalledWith({
      $or: [
        { author: new RegExp(searchQuery, 'i') },
        { title: new RegExp(searchQuery, 'i') }
      ]
    });
    expect(mockedJson).toHaveBeenCalledWith(mockedBook);
  });

  // Aquí puedes agregar más pruebas para manejar casos de error o diferentes escenarios
});
