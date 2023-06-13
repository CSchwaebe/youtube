import { useEffect, useState } from 'react'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'

export default function Profile() {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const [_isConnected, _setIsConnected] = useState(false);
  const [_connectors, _setConnectors] = useState([]);


  useEffect(() => {
    _setIsConnected(isConnected);
  }, [isConnected]);

  useEffect(() => {
    _setConnectors(connectors);
  }, [connectors]);

  
  if (isConnected) {
    return (
      <div>
        <div>{address}</div>
        <div>Connected to {connector.name}</div>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    )
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  )
}
