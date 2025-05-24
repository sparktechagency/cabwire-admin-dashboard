import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store.js'
import { ConfigProvider } from 'antd'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // Base tokens
          colorPrimary: '#041B44',
          colorPrimaryBg: '#e6f0ff',
          colorPrimaryBgHover: '#d0ddec',
          colorPrimaryBorder: '#a3b3d1',
          colorPrimaryBorderHover: '#7a8bb7',
          colorPrimaryHover: '#0A2A66',
          colorPrimaryActive: '#041B44',
          colorPrimaryTextHover: '#0A2A66',
          colorPrimaryText: '#041B44',
          colorPrimaryTextActive: '#041B44',

          colorSuccess: '#52c41a',
          colorWarning: '#faad14',
          colorError: '#ff4d4f',
          colorInfo: '#041B44',

          colorBgContainer: '#ffffff',
          colorBorder: '#d9d9d9',
          colorText: 'rgba(0, 0, 0, 0.88)',
          colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
          colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
          colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
        },
        components: {
          // Button component
          Button: {
            colorPrimaryActive: '#041B44',
            controlHeight: 40,
            borderRadius: 6,
            fontWeight: 500,
          },

          // Input components
          Input: {
            colorPrimary: '#041B44',
            activeBorderColor: '#041B44',
            hoverBorderColor: '#041B44',
            activeShadow: 'none',
            borderRadius: 6,
            paddingBlock: 10,
            paddingInline: 10,
          },

          // Select component
          Select: {
            colorPrimary: '#041B44',
            optionSelectedBg: 'rgba(4, 27, 68, 0.08)',
            optionActiveBg: 'rgba(4, 27, 68, 0.16)',
            controlHeight: 44,
          },

          // Checkbox component
          Checkbox: {
            colorPrimary: '#041B44',
          },

          // Radio component
          Radio: {
            colorPrimary: '#041B44',
            dotSize: 10,
          },

          // Switch component
          Switch: {
            colorPrimary: '#041B44',
            handleSize: 16,
          },

          // Slider component
          Slider: {
            colorPrimary: '#041B44',
            colorPrimaryBorder: '#041B44',
            handleSize: 16,
            handleSizeHover: 18,
          },

          // Menu component
          Menu: {
            colorItemBgSelected: 'rgba(4, 27, 68, 0.08)',
            colorItemTextSelected: '#041B44',
            colorItemTextHover: '#0A2A66',
            colorActiveBarBorderSize: 0,
            paddingBlock: 10,
            paddingInline: 10,
          },

          // Table component
          Table: {
            headerBg: '#fafafa',
            headerColor: 'rgba(0, 0, 0, 0.88)',
            rowHoverBg: 'rgba(4, 27, 68, 0.04)',
            borderColor: '#f0f0f0',
          },

          // Tabs component
          Tabs: {
            colorPrimary: '#041B44',
            inkBarColor: '#041B44',
            itemSelectedColor: '#041B44',
            itemHoverColor: '#0A2A66',
            itemActiveColor: '#041B44',
          },

          // Progress component
          Progress: {
            colorInfo: '#041B44',
          },

          // Tag component
          Tag: {
            colorPrimary: 'rgba(4, 27, 68, 0.1)',
            colorPrimaryBorder: 'rgba(4, 27, 68, 0.3)',
            colorPrimaryHover: 'rgba(4, 27, 68, 0.2)',
          },

          // Notification component
          Notification: {
            colorBgElevated: '#ffffff',
            colorInfo: '#041B44',
            colorInfoBg: 'rgba(4, 27, 68, 0.1)',
            colorInfoBorder: 'rgba(4, 27, 68, 0.2)',
          },

          // Alert component
          Alert: {
            colorInfo: '#041B44',
            colorInfoBorder: 'rgba(4, 27, 68, 0.3)',
            colorInfoBg: 'rgba(4, 27, 68, 0.1)',
          },

          // Badge component
          Badge: {
            colorPrimary: '#041B44',
          },

          // Card component
          Card: {
            colorBorderSecondary: '#f0f0f0',
          },

          // Tooltip component
          Tooltip: {
            colorBgDefault: '#041B44',
          },

          // Dropdown component
          Dropdown: {
            colorPrimary: '#041B44',
            paddingBlock: 10,
            paddingInline: 10,
          },

          // Steps component
          Steps: {
            colorPrimary: '#041B44',
            colorText: 'rgba(0, 0, 0, 0.88)',
          },

          // DatePicker component
          DatePicker: {
            colorPrimary: '#041B44',
            activeBorderColor: '#041B44',
          },

          // Modal component
          Modal: {
            colorPrimary: '#041B44',
          },

          // Drawer component
          Drawer: {
            colorPrimary: '#041B44',
          },

          // Upload component
          Upload: {
            colorPrimary: '#041B44',
          },
        }
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </StrictMode>,
)