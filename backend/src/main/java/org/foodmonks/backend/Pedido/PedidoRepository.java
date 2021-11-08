package org.foodmonks.backend.Pedido;

import org.foodmonks.backend.Restaurante.Restaurante;
import org.foodmonks.backend.datatypes.EstadoPedido;
import org.foodmonks.backend.datatypes.MedioPago;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    Pedido findPedidoById(Long id);
    List<Pedido> findPedidosByRestaurante(Restaurante restaurante);
    List<Pedido> findPedidosByRestauranteAndEstadoAndMedioPago(Restaurante restaurante, EstadoPedido estadoPedido, MedioPago medioPago);
    Boolean existsPedidoById(Long id);
    Boolean existsPedidoByIdAndRestaurante(Long id, Restaurante restaurante);

}