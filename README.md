# SOL NFT Data Dash
![image](https://github.com/user-attachments/assets/1c1c43c2-ffc2-4787-ba18-09d7d3547b28)


This is a React-based web application that provides detailed information about NFT collections on the Solana blockchain. It uses the HelloMoon API to fetch and display data about NFT collections, including statistics, loan summaries, ownership information, and floor prices.

## Features

- Search for NFT collections
- View detailed collection information, including:
  - Collection stats (supply, holders, listings, average price, market cap, wash trading score)
  - Loan summary (default rates, number of defaults, number of repaid loans)
  - Ownership information (current owners, owners over time, top holders)
  - Floor price history (with chart visualization)
- Responsive design for desktop and mobile devices

# Collections Detail Page
![image](https://github.com/user-attachments/assets/2351a275-a1a2-4b27-90e2-4b99a8fac8c1)

## Technologies Used

- React.js
- React Router
- Axios for API requests
- Recharts for data visualization
- Tailwind CSS for styling
- HelloMoon API for NFT data

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 14 or higher)
- npm (usually comes with Node.js)
- A HelloMoon API key (sign up at https://www.hellomoon.io/dashboard)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/heyimsteve/nftfi.git
   cd nftfi
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your HelloMoon API key:
   ```
   REACT_APP_HELLOMOON_API_KEY=your_api_key_here
   ```

## Running the Application

To start the development server, run:

```
npm start
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build, run:

```
npm run build
```

This will create a `build` directory with optimized production-ready files.

## Usage

1. Open the application in your web browser.
2. Use the search bar to find NFT collections by name.
3. Click on a collection to view detailed information.
4. Explore the different sections (Collection Stats, Loan Summary, Ownership Info, Floor Price) to gain insights about the NFT collection.

## Contributing

Contributions to this project are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

If you have any questions or feedback, please open an issue on GitHub or contact me.
