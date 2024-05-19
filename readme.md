# API Testing Framework

This project provides a comprehensive framework for API testing using popular
Node.js libraries such as 'superagent', 'supertest', and 'nock'. It allows you
to write and execute tests for your APIs, as well as mock external API responses
for more reliable and isolated testing.

## Features

- **API Testing**: Write tests for your APIs using the powerful 'superagent' and
  'supertest' libraries.
- **API Mocking**: Mock external API responses using the 'nock' library,
  ensuring consistent and isolated testing environments.
- **Backend ExpressJS Server**: Real API backend implemented using the 'express'
  and 'mongoose' library.
- **Modular Structure**: The framework is designed with a modular structure,
  making it easy to organize and maintain your tests.
- **Extensible**: Easily extend the framework with additional libraries or
  custom utilities to suit your specific testing needs.

## Getting Started

1. Clone the repository:

git clone https://github.com/kwishna/express-supertest-api.git

2. Install dependencies:

cd express-supertest-api npm install

3. Write your tests in the `tests/` directory, following the provided examples.

4. Run the tests.

## Project Structure

- `tests/`: Directory containing your API test files.
- `mocks/`: Directory for defining API mocks using 'nock'.
- `utils/`: Utility functions and helpers for testing.
- `package.json`: Project configuration and dependencies.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for
improvements, please open an issue or submit a pull request.

## License

This project is not licensed. Free for use by anyone.
