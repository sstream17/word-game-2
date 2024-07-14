import 'package:flutter/material.dart';
import 'package:word_game/constants/routes.dart';

class GameAppBar extends StatelessWidget implements PreferredSizeWidget {
  GameAppBar({super.key, this.title});

  final String? title;
  final FocusNode _buttonFocusNode = FocusNode(debugLabel: 'Menu Button');

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: title != null ? Text(title!) : null,
      centerTitle: true,
      elevation: 0,
      scrolledUnderElevation: 0,
      actions: [
        MenuAnchor(
          childFocusNode: _buttonFocusNode,
          alignmentOffset: const Offset(
            -100,
            0,
          ),
          menuChildren: [
            MenuItemButton(
              onPressed: () {
                if (ModalRoute.of(context)?.settings.name != routeHowToPlay) {
                  Navigator.pushNamed(context, routeHowToPlay);
                }
              },
              leadingIcon: const Icon(Icons.info_outline),
              child: const Text("How to play"),
            ),
            MenuItemButton(
              onPressed: () {
                if (ModalRoute.of(context)?.settings.name != routeStats) {
                  Navigator.pushNamed(context, routeStats);
                }
              },
              leadingIcon: const Icon(Icons.bar_chart),
              child: const Text("Stats"),
            ),
          ],
          builder: (
            BuildContext context,
            MenuController controller,
            Widget? child,
          ) {
            return IconButton(
              focusNode: _buttonFocusNode,
              onPressed: () {
                if (controller.isOpen) {
                  controller.close();
                } else {
                  controller.open();
                }
              },
              icon: const Icon(Icons.more_vert),
            );
          },
        )
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
