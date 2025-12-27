# CepTecash 📱💰

A modern and user-friendly asset tracking and management application. Built with React Native and Expo, it's a cross-platform app that works on iOS, Android, and Web.

## 🎯 Features

### 📊 Market
- Real-time asset price tracking
- Popular assets listing
- Category-based filtering
- Instant price updates
- Detailed market analysis

### 💸 Transactions
- Quick transaction addition
- Multi-currency support
- Automatic TRY conversion calculations
- Transaction history tracking
- Modal-based user interface

### 📈 Portfolio
- Portfolio value tracking
- Daily performance analysis
- Asset distribution charts
- Portfolio statistics
- Real-time exchange rates
- Asset holding information

### 👤 Profile
- User settings
- Theme preferences (Light/Dark mode)
- Application settings
- Profile management

### 🚀 Easy Buy/Sell
- Simplified buy/sell interface
- Quick transaction execution
- Secure transaction flow

### 🎨 Onboarding
- First-time user experience
- Application introduction
- User guide

## 🛠️ Technologies

### Core
- **React Native** 0.81.5
- **Expo** ~54.0.29
- **TypeScript** ~5.9.2
- **React** 19.1.0

### State Management
- **Redux Toolkit** ^2.11.2
- **React Redux** ^9.2.0

### Navigation
- **React Navigation** ^7.1.8
- **Bottom Tabs Navigator**
- **Stack Navigator**

### UI & Styling
- **Expo Vector Icons** ^15.0.3
- **React Native SVG** 15.12.1
- **Themed Components** (Light/Dark mode support)

### Data & Storage
- **AsyncStorage** ^2.2.0
- **Axios** ^1.13.2
- **WebSocket** (Real-time data)

### Utilities
- **Expo Haptics** ~15.0.8
- **React Native Reanimated** ~4.1.1
- **React Native Gesture Handler** ~2.28.0

## 📁 Project Structure

```
ceptecash/
├── src/
│   ├── assets/              # Images, icons, SVGs
│   ├── components/          # Reusable components
│   │   ├── layout/         # Layout components (AppLogo, Navbar)
│   │   └── ui/             # UI components (Button, ThemedText, etc.)
│   ├── constants/          # Constants and theme settings
│   ├── contexts/           # React Contexts (ThemeContext)
│   ├── db/                 # Database schemas and columns
│   ├── feautures/          # Feature-based modules
│   │   ├── easyBuySell/   # Easy buy/sell feature
│   │   ├── market/         # Market feature
│   │   ├── onboarding/    # Onboarding screen
│   │   ├── portfolio/      # Portfolio feature
│   │   ├── profile/        # Profile feature
│   │   └── transactions/  # Transactions feature
│   ├── hooks/              # Custom React hooks
│   ├── navigation/         # Navigation configuration
│   │   ├── stacks/        # Stack navigators
│   │   └── tabs/          # Tab navigator configuration
│   ├── services/           # API services and token management
│   ├── store/              # Redux store and slices
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Helper functions
├── App.tsx                 # Main application component
├── app.json                # Expo configuration
└── package.json            # Dependencies
```

## 🚀 Installation

### Requirements
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (can be installed globally)
- iOS Simulator (for Mac) or Android Emulator

### Steps

1. **Clone the project**
   ```bash
   git clone <repository-url>
   cd ceptecash
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the app**
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Platform options**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For Web
   npm run web
   ```

## 📱 Usage

### First Launch
When the app is first opened, an onboarding screen is displayed. This screen introduces the basic features of the application.

### Main Screens

#### Market
- View asset prices
- Filter by categories
- Track real-time price updates

#### Transactions
- Add quick transactions
- Select currency and enter amount
- View automatic TRY conversion

#### Portfolio
- View your portfolio value
- Track your daily performance
- Analyze your asset distribution

#### Profile
- Change theme preferences
- Manage application settings

## 🎨 Theme Support

The app supports both light and dark themes:
- Automatic system theme adaptation
- Manual theme selection
- Consistent theme application across all screens

## 🔧 Development

### Linting
```bash
npm run lint
```

### TypeScript Check
TypeScript type checking is done automatically. Use your IDE's TypeScript support to see errors.

### Code Structure
- **Feature-based** organization: Each feature in its own folder
- **Component-based** architecture: Reusable components
- **Type-safe**: Full type safety with TypeScript
- **Themed components**: Components with theme support

## 📦 Build

### Development Build
```bash
npx expo run:ios
npx expo run:android
```

### Production Build
You can create a production build using Expo EAS Build:
```bash
eas build --platform ios
eas build --platform android
```

## 🔐 Security

- API tokens are stored securely
- Local data storage with AsyncStorage
- Secure HTTP requests (Axios)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This is a private project.

## 👨‍💻 Developer

Developed by the CepTecash team.

## 📞 Contact

You can open an issue for questions or suggestions.

---

**Note**: This application is under development. Additional tests and optimizations may be required for production use.
