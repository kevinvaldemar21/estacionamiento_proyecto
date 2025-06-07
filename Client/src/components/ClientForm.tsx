import React, { useState } from "react";
import "./ClientForm.css";

interface Client {
  ticket: string;
  name: string;
  plate: string;
  carModel: string;
  paymentStatus: string; // "Pendiente" o "Pagado"
}

const ClientForm: React.FC = () => {
  const [ticket, setTicket] = useState("");
  const [plate, setPlate] = useState("");
  const [clientName, setClientName] = useState("");
  const [carModel, setCarModel] = useState("Toyota");
  const [entryTime, setEntryTime] = useState("");
  const [exitTime, setExitTime] = useState("");
  const [payment, setPayment] = useState("");
  const [spaces, setSpaces] = useState(Array(15).fill("Disponible")); // 15 espacios iniciales
  const [clients, setClients] = useState<Client[]>([]); // Lista de clientes

  const handlePayment = async (ticket: string) => {
    try {
        // Enviar solicitud al backend para actualizar el estado de pago
        const response = await fetch(`http://localhost:3000/api/clients/${ticket}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ paymentStatus: "Pagado" }),
        });

        if (response.ok) {
            // Actualizar el estado de los clientes en el frontend
            setClients((prevClients) =>
                prevClients.map((client) =>
                    client.ticket === ticket ? { ...client, paymentStatus: "Pagado" } : client
                )
            );
            alert("El estado de pago se actualizó correctamente.");
        } else {
            alert("Error al actualizar el estado de pago.");
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        alert("Error al conectar con el servidor.");
    }
};

  const handleSubmit = async () => {
    const spaceIndex = parseInt(ticket) - 1; // Convertir el boleto a índice del arreglo
    if (!ticket || isNaN(spaceIndex) || spaceIndex < 0 || spaceIndex >= spaces.length) {
        alert("Por favor, ingresa un número de espacio válido (entre 1 y 15).");
        return;
    }

    if (plate && clientName && carModel && payment) {
        const updatedSpaces = [...spaces];
        if (updatedSpaces[spaceIndex] === "Disponible") {
            updatedSpaces[spaceIndex] = "Ocupado";
            setSpaces(updatedSpaces);

            const newClient = {
                ticket,
                name: clientName,
                plate,
                carModel,
                paymentStatus: "Pendiente",
            };

            try {
                // Enviar datos al servidor
                const response = await fetch("http://localhost:3000/api/clients", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newClient),
                });

                if (response.ok) {
                    const savedClient = await response.json();
                    setClients([...clients, savedClient.data]); // Agregar el cliente guardado a la lista
                    alert("Datos guardados correctamente.");
                    resetForm(); // Limpiar el formulario
                } else {
                    alert("Error al guardar los datos.");
                }
            } catch (error) {
                console.error("Error al conectar con el servidor:", error);
                alert("Error al conectar con el servidor.");
            }
        } else {
            alert("El espacio ya está ocupado.");
        }
    } else {
        alert("Por favor, completa todos los campos.");
    }
};

  const resetForm = () => {
    setTicket("");
    setPlate("");
    setClientName("");
    setCarModel("Toyota");
    setEntryTime("");
    setExitTime("");
    setPayment("");
  };

  return (
    <div className="parking-container">
      <h1>ESTACIONAMIENTO <span className="highlight">CARZ</span></h1>

      <div className="grid-container">
        {/* Formulario */}
        <div className="form-section">
          <h2>Registrar Cliente</h2>
          <div className="form-group">
            <label>CLIENTE</label>
            <input
              type="text"
              placeholder="Nombre del cliente"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>MODELO</label>
            <select
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
            >
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="Ford">Ford</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="Nissan">Nissan</option>
            </select>
          </div>
          <div className="form-group">
            <label>BOLETO / UBIC.</label>
            <input
              type="text"
              placeholder="000020"
              value={ticket}
              onChange={(e) => setTicket(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>PLACA</label>
            <input
              type="text"
              placeholder="USO-654"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>ENTRADA</label>
            <input
              type="datetime-local"
              value={entryTime}
              onChange={(e) => setEntryTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>SALIDA</label>
            <input
              type="datetime-local"
              value={exitTime}
              onChange={(e) => setExitTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>VALOR A PAGAR</label>
            <input
              type="text"
              placeholder="$"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button onClick={handleSubmit}>INGRESAR</button>
            <button onClick={resetForm}>LIMPIAR</button>
          </div>
        </div>

        {/* Tabla de espacios */}
        <div className="table-section">
          <h2>Resumen de Espacios</h2>
          <table>
            <thead>
              <tr>
                <th>Espacio</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {spaces.map((status, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className={status === "Ocupado" ? "occupied" : "available"}>
                    {status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tabla de clientes */}
        <div className="table-section">
          <h2>Clientes Registrados</h2>
          <table>
            <thead>
              <tr>
                <th>Boleto</th>
                <th>Nombre</th>
                <th>Placa</th>
                <th>Modelo</th>
                <th>Estado de Pago</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={index}>
                  <td>{client.ticket}</td>
                  <td>{client.name}</td>
                  <td>{client.plate}</td>
                  <td>{client.carModel}</td>
                  <td className={client.paymentStatus === "Pagado" ? "available" : "occupied"}>
                    {client.paymentStatus}
                  </td>
                  <td>
                    {client.paymentStatus === "Pendiente" && (
                      <button onClick={() => handlePayment(client.ticket)}>Marcar como Pagado</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;