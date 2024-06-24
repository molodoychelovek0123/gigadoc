import React, { useEffect, useState } from 'react';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const services = [
  { name: 'DocxPress', url: publicRuntimeConfig.docxPressUrl },
  { name: 'MS Report', url: publicRuntimeConfig.msReportUrl },
  { name: 'S3 Service', url: publicRuntimeConfig.s3ServiceUrl },
  { name: 'ES Service', url: publicRuntimeConfig.esServiceUrl },
  { name: 'MS Toolbert', url: publicRuntimeConfig.msToolbertUrl },
  { name: 'MS Gen', url: publicRuntimeConfig.msGenUrl },
];

type ServiceStatus = {
  [key: string]: string;
};

export const HealthCheck: React.FC = () => {
  const [statuses, setStatuses] = useState<ServiceStatus>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkHealth = async () => {
    const newStatuses: ServiceStatus = {};
    for (const service of services) {
      try {
        const response = await fetch(`${service.url}/health`);
        if (response.status === 200) {
          newStatuses[service.name] = 'Healthy';
        } else {
          newStatuses[service.name] = 'Unhealthy';
        }
      } catch (error) {
        newStatuses[service.name] = 'Unreachable';
      }
    }
    setStatuses(newStatuses);
  };

  useEffect(() => {
    checkHealth();
    const intervalId = setInterval(checkHealth, 5 * 60 * 1000); // 5 минут

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed top-6 right-6 z-50 min-w-6">
      <button
        onClick={() => setIsModalOpen((prevState) => !prevState)}
        className={'absolute right-0'}
      >
        <img src="/icons/health.svg" alt="Settings" className="w-6 h-6" />
      </button>
      {isModalOpen && (
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-bold mb-4">Состояния микросервисов</h2>
          <ul className="space-y-2">
            {services.map((service) => (
              <li
                key={service.name}
                className="flex items-center justify-between"
              >
                <span className="font-semibold mr-2">{service.name}</span>
                <span
                  className={`w-4 h-4 rounded-full health-circle
                      ${statuses[service.name] === 'Healthy' ? 'bg-green-500' : ''} 
                      ${statuses[service.name] === 'Unhealthy' ? 'bg-yellow-500' : ''} 
                      ${statuses[service.name] === 'Unreachable' ? 'bg-red-500' : ''}`}
                  onClick={checkHealth}
                ></span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
