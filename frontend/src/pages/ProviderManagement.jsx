import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Edit, 
  Trash2, 
  MoreVertical,
  CheckCircle,
  XCircle
} from 'lucide-react';

const ProviderManagement = () => {
  const [providers, setProviders] = useState([
    {
      id: 1,
      name: 'SMS Provider A',
      country: 'IN',
      flag: '🇮🇳',
      countryName: 'India',
      status: 'active',
      services: 0,
      icon: Monitor
    },
    {
      id: 2,
      name: 'WhatsApp Provider B',
      country: 'IN',
      flag: '🇮🇳',
      countryName: 'India',
      status: 'active',
      services: 0,
      icon: Monitor
    },
    {
      id: 3,
      name: 'Telegram Provider C',
      country: 'IN',
      flag: '🇮🇳',
      countryName: 'India',
      status: 'active',
      services: 0,
      icon: Monitor
    },
    {
      id: 4,
      name: 'Gmail Provider D',
      country: 'IN',
      flag: '🇮🇳',
      countryName: 'India',
      status: 'inactive',
      services: 0,
      icon: Monitor
    }
  ]);

  const handleEdit = (id) => {
    console.log('Edit provider:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete provider:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Provider Management
            </h1>
            <button className="btn-primary">
              Add New Provider
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Service Providers
              </h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {providers.map((provider) => (
                  <motion.div
                    key={provider.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    {/* Provider Info */}
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                        <provider.icon className="w-5 h-5 text-primary-600" />
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {provider.name}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {provider.country}
                            </span>
                            <span className="text-lg">{provider.flag}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {provider.countryName}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="flex items-center space-x-4">
                      {/* Status */}
                      <div className="flex items-center space-x-2">
                        {provider.status === 'active' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm font-medium ${
                          provider.status === 'active' 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {provider.status}
                        </span>
                      </div>

                      {/* Services Count */}
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {provider.services} services
                      </span>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(provider.id)}
                          className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-300"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(provider.id)}
                          className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-300"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-300">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProviderManagement;
