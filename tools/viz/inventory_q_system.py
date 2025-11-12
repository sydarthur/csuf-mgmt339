from manim import *
import numpy as np

class InventoryQSystem(Scene):
    def construct(self):
        # ===== SYSTEM PARAMETERS =====
        L = 5  # Lead time (days)
        R = 300  # Reorder point
        T = 620  # Target inventory level
        initial_inventory = 400  # Initial on-hand inventory

        # Demand schedule for 14 days
        demand = [50, 60, 80, 40, 75, 55, 95, 50, 45, 30, 50, 60, 40, 50]

        # State variables
        on_hand = initial_inventory
        scheduled_receipts = 0
        backorders = 0
        orders = []  # List of (order_day, quantity, arrival_day)

        # ===== TITLE SCREEN =====
        title = Text("Inventory Q-System Simulation", font_size=48, weight=BOLD)
        subtitle = Text("Example 10.5: Sony Plasma TV Sets", font_size=32)
        subtitle.next_to(title, DOWN, buff=0.5)

        self.play(Write(title), run_time=1.5)
        self.play(FadeIn(subtitle), run_time=1)
        self.wait(1.5)
        self.play(FadeOut(title), FadeOut(subtitle))

        # ===== SETUP VISUAL ELEMENTS =====
        # Create static elements that persist

        # Day counter (top left)
        day_label = Text("Day:", font_size=36, weight=BOLD)
        day_label.to_corner(UL).shift(RIGHT * 0.5 + DOWN * 0.3)
        day_number = Text("1", font_size=48, color=YELLOW)
        day_number.next_to(day_label, RIGHT, buff=0.3)

        # Inventory display (left side)
        inv_title = Text("Inventory Status", font_size=28, weight=BOLD, color=BLUE)
        inv_title.to_edge(LEFT).shift(RIGHT * 0.5 + DOWN * 1.5)

        oh_text = Text("On-Hand (OH):", font_size=24)
        oh_text.next_to(inv_title, DOWN, buff=0.4, aligned_edge=LEFT)
        oh_value = Text(str(on_hand), font_size=32, color=GREEN)
        oh_value.next_to(oh_text, RIGHT, buff=0.3)

        sr_text = Text("Scheduled (SR):", font_size=24)
        sr_text.next_to(oh_text, DOWN, buff=0.3, aligned_edge=LEFT)
        sr_value = Text(str(scheduled_receipts), font_size=32, color=BLUE)
        sr_value.next_to(sr_text, RIGHT, buff=0.3)

        ip_text = Text("Position (IP):", font_size=24)
        ip_text.next_to(sr_text, DOWN, buff=0.3, aligned_edge=LEFT)
        ip_value = Text(str(on_hand + scheduled_receipts), font_size=32, color=PURPLE)
        ip_value.next_to(ip_text, RIGHT, buff=0.3)

        # Formula display
        formula = Text("IP = OH + SR - BO", font_size=24)
        formula.next_to(ip_text, DOWN, buff=0.5, aligned_edge=LEFT)

        # Parameters box (top right)
        params_title = Text("System Parameters", font_size=24, weight=BOLD)
        params_title.to_corner(UR).shift(LEFT * 0.5 + DOWN * 0.3)

        param_r = Text("R = 300", font_size=24, color=ORANGE)
        param_r.next_to(params_title, DOWN, buff=0.3, aligned_edge=RIGHT)

        param_t = Text("T = 620", font_size=24, color=RED)
        param_t.next_to(param_r, DOWN, buff=0.2, aligned_edge=RIGHT)

        param_l = Text("L = 5 days", font_size=24)
        param_l.next_to(param_t, DOWN, buff=0.2, aligned_edge=RIGHT)

        # Graph setup (center-right)
        graph_origin = np.array([2, -1, 0])

        # Create axes for the graph
        axes = Axes(
            x_range=[0, 15, 1],
            y_range=[0, 700, 100],
            x_length=5,
            y_length=3.5,
            axis_config={"color": GREY},
            x_axis_config={"numbers_to_include": range(0, 15, 2)},
            y_axis_config={"numbers_to_include": range(0, 700, 100)},
        ).shift(graph_origin)

        axes_labels = axes.get_axis_labels(
            x_label=Text("Day", font_size=20),
            y_label=Text("Units", font_size=20)
        )

        # Reference lines on graph
        target_line = DashedLine(
            axes.c2p(0, T), axes.c2p(14, T),
            color=RED, stroke_width=2
        )
        target_label = Text("T=620", font_size=18, color=RED)
        target_label.next_to(target_line.get_end(), RIGHT, buff=0.1)

        reorder_line = DashedLine(
            axes.c2p(0, R), axes.c2p(14, R),
            color=ORANGE, stroke_width=2
        )
        reorder_label = Text("R=300", font_size=18, color=ORANGE)
        reorder_label.next_to(reorder_line.get_end(), RIGHT, buff=0.1)

        # Legend
        legend_title = Text("Legend:", font_size=20, weight=BOLD)
        legend_title.next_to(axes, DOWN, buff=0.4, aligned_edge=LEFT)

        oh_legend = Line(ORIGIN, RIGHT * 0.3, color=BLUE, stroke_width=4)
        oh_legend_text = Text("On-Hand", font_size=16)
        oh_legend.next_to(legend_title, DOWN, buff=0.2, aligned_edge=LEFT)
        oh_legend_text.next_to(oh_legend, RIGHT, buff=0.1)

        ip_legend = Line(ORIGIN, RIGHT * 0.3, color=PURPLE, stroke_width=4)
        ip_legend_text = Text("Position", font_size=16)
        ip_legend.next_to(oh_legend, RIGHT, buff=0.5)
        ip_legend_text.next_to(ip_legend, RIGHT, buff=0.1)

        # Draw initial static elements
        self.play(
            Create(day_label),
            Create(day_number),
            Create(inv_title),
            Create(oh_text),
            Create(oh_value),
            Create(sr_text),
            Create(sr_value),
            Create(ip_text),
            Create(ip_value),
            Create(formula),
            Create(params_title),
            Create(param_r),
            Create(param_t),
            Create(param_l),
            run_time=2
        )

        self.play(
            Create(axes),
            Create(axes_labels),
            Create(target_line),
            Create(target_label),
            Create(reorder_line),
            Create(reorder_label),
            Create(legend_title),
            Create(oh_legend),
            Create(oh_legend_text),
            Create(ip_legend),
            Create(ip_legend_text),
            run_time=2
        )

        self.wait(1)

        # ===== DATA TRACKING FOR GRAPH =====
        oh_points = [initial_inventory]
        ip_points = [initial_inventory + scheduled_receipts]

        # Initialize graph lines
        oh_graph = VMobject(color=BLUE, stroke_width=3)
        oh_graph.set_points_as_corners([axes.c2p(1, oh_points[0])])

        ip_graph = VMobject(color=PURPLE, stroke_width=3)
        ip_graph.set_points_as_corners([axes.c2p(1, ip_points[0])])

        self.add(oh_graph, ip_graph)

        # ===== SIMULATE EACH DAY =====
        for day in range(1, 15):
            current_day = day
            daily_demand = demand[day - 1]

            # Update day counter
            new_day_number = Text(str(current_day), font_size=48, color=YELLOW)
            new_day_number.next_to(day_label, RIGHT, buff=0.3)
            self.play(Transform(day_number, new_day_number), run_time=0.3)

            # Show demand for the day
            demand_text = Text(f"Demand: {daily_demand} units", font_size=28, color=YELLOW)
            demand_text.to_edge(DOWN).shift(UP * 0.5)
            self.play(FadeIn(demand_text), run_time=0.3)

            # Check if any orders arrive today
            order_received = False
            for order in orders[:]:
                if order[2] == current_day:  # arrival_day
                    order_received = True
                    receipt_qty = order[1]

                    # Animate order receipt
                    receipt_text = Text(
                        f"ORDER RECEIVED: {receipt_qty} units",
                        font_size=32,
                        color=GREEN,
                        weight=BOLD
                    )
                    receipt_box = SurroundingRectangle(receipt_text, color=GREEN, buff=0.2)
                    receipt_group = VGroup(receipt_box, receipt_text)
                    receipt_group.move_to(ORIGIN)

                    self.play(FadeIn(receipt_group), run_time=0.5)
                    self.wait(1)

                    # Update inventory
                    on_hand += receipt_qty
                    scheduled_receipts -= receipt_qty

                    # Update displays
                    new_oh = Text(str(on_hand), font_size=32, color=GREEN)
                    new_oh.next_to(oh_text, RIGHT, buff=0.3)

                    new_sr = Text(str(scheduled_receipts), font_size=32, color=BLUE)
                    new_sr.next_to(sr_text, RIGHT, buff=0.3)

                    self.play(
                        Transform(oh_value, new_oh),
                        Transform(sr_value, new_sr),
                        run_time=0.5
                    )

                    self.play(FadeOut(receipt_group), run_time=0.3)
                    orders.remove(order)

            # Process daily demand
            on_hand -= daily_demand

            # Update on-hand display
            new_oh = Text(str(on_hand), font_size=32, color=GREEN)
            new_oh.next_to(oh_text, RIGHT, buff=0.3)
            self.play(Transform(oh_value, new_oh), run_time=0.4)

            # Calculate inventory position
            inventory_position = on_hand + scheduled_receipts - backorders

            # Update IP display
            new_ip = Text(str(inventory_position), font_size=32, color=PURPLE)
            new_ip.next_to(ip_text, RIGHT, buff=0.3)
            self.play(Transform(ip_value, new_ip), run_time=0.3)

            # Update graph points
            oh_points.append(on_hand)
            ip_points.append(inventory_position)

            # Update graph lines
            new_oh_graph = VMobject(color=BLUE, stroke_width=3)
            oh_coords = [axes.c2p(i + 1, oh_points[i]) for i in range(len(oh_points))]
            new_oh_graph.set_points_as_corners(oh_coords)

            new_ip_graph = VMobject(color=PURPLE, stroke_width=3)
            ip_coords = [axes.c2p(i + 1, ip_points[i]) for i in range(len(ip_points))]
            new_ip_graph.set_points_as_corners(ip_coords)

            self.play(
                Transform(oh_graph, new_oh_graph),
                Transform(ip_graph, new_ip_graph),
                run_time=0.4
            )

            # Check if we need to place an order (IP < R)
            if inventory_position < R:
                # Calculate order quantity
                Q = T - inventory_position
                arrival_day = current_day + L

                # Store the order
                orders.append((current_day, Q, arrival_day))
                scheduled_receipts += Q

                # Animate order placement
                order_formula = Text(
                    f"IP < R → Q = T - IP = {T} - {inventory_position} = {Q}",
                    font_size=26,
                    color=RED
                )
                order_text = Text(
                    f"ORDER PLACED: {Q} units (Due Day {arrival_day})",
                    font_size=32,
                    color=RED,
                    weight=BOLD
                )
                order_box = SurroundingRectangle(order_text, color=RED, buff=0.2)

                order_formula.move_to(ORIGIN).shift(UP * 0.5)
                order_group = VGroup(order_box, order_text)
                order_group.next_to(order_formula, DOWN, buff=0.3)

                self.play(FadeIn(order_formula), run_time=0.5)
                self.play(FadeIn(order_group), Flash(order_group, color=RED), run_time=0.5)
                self.wait(1.5)

                # Update scheduled receipts display
                new_sr = Text(str(scheduled_receipts), font_size=32, color=BLUE)
                new_sr.next_to(sr_text, RIGHT, buff=0.3)
                self.play(Transform(sr_value, new_sr), run_time=0.4)

                # Update IP after SR change
                inventory_position = on_hand + scheduled_receipts - backorders
                new_ip = Text(str(inventory_position), font_size=32, color=PURPLE)
                new_ip.next_to(ip_text, RIGHT, buff=0.3)
                self.play(Transform(ip_value, new_ip), run_time=0.3)

                self.play(
                    FadeOut(order_formula),
                    FadeOut(order_group),
                    run_time=0.3
                )

            self.play(FadeOut(demand_text), run_time=0.2)
            self.wait(0.3)

        # ===== FINAL SUMMARY =====
        self.wait(1)

        summary_title = Text("Simulation Complete", font_size=42, weight=BOLD, color=YELLOW)
        summary_title.to_edge(UP)

        total_orders = len([o for o in orders]) + 3  # 3 orders were placed
        summary_text = VGroup(
            Text(f"Total Orders Placed: 3", font_size=28),
            Text(f"Final On-Hand Inventory: {on_hand} units", font_size=28),
            Text(f"Scheduled Receipts: {scheduled_receipts} units", font_size=28),
            Text(f"System maintained service level", font_size=28, color=GREEN),
        ).arrange(DOWN, buff=0.3)
        summary_text.next_to(summary_title, DOWN, buff=0.5)

        self.play(
            FadeIn(summary_title),
            FadeIn(summary_text),
            run_time=2
        )

        self.wait(3)

        # Fade out everything
        self.play(*[FadeOut(mob) for mob in self.mobjects], run_time=2)


# Alternative higher quality render configuration
class InventoryQSystemHD(InventoryQSystem):
    """High-definition version with better quality settings"""
    pass
