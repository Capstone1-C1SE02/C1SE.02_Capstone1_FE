import { Form, Container, Table, Modal } from 'react-bootstrap';
import { useState } from 'react';
import ButtonC from '~/components/ButtonC';

import classNames from 'classnames/bind';
import styles from './GenaralTable.module.scss';
const cx = classNames.bind(styles);

function GenaralTable() {
    return (
        <div class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">
                            Save changes
                        </button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GenaralTable;
