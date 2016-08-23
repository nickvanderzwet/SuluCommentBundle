<?php

/*
 * This file is part of Sulu.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\CommentBundle\Controller;

use FOS\RestBundle\Routing\ClassResourceInterface;
use Sulu\Component\Rest\ListBuilder\ListRepresentation;
use Sulu\Component\Rest\RestController;
use Symfony\Component\HttpFoundation\Request;

/**
 * Provides an api for comments.
 */
class CommentController extends RestController implements ClassResourceInterface
{
    public function getFieldsAction()
    {
        return $this->handleView($this->view($this->getFieldDescriptors()));
    }

    public function cgetAction(Request $request)
    {
        $restHelper = $this->get('sulu_core.doctrine_rest_helper');
        $factory = $this->get('sulu_core.doctrine_list_builder_factory');
        $listBuilder = $factory->create($this->getParameter('sulu.model.comment.class'));

        $restHelper->initializeListBuilder($listBuilder, $this->getFieldDescriptors());
        $results = $listBuilder->execute();
        $list = new ListRepresentation(
            $results,
            'comments',
            'get_comments',
            $request->query->all(),
            $listBuilder->getCurrentPage(),
            $listBuilder->getLimit(),
            $listBuilder->count()
        );

        return $this->handleView($this->view($list, 200));
    }

    private function getFieldDescriptors()
    {
        return $this->get(
            'sulu_core.list_builder.field_descriptor_factory'
        )->getFieldDescriptorForClass($this->getParameter('sulu.model.comment.class'));
    }
}
